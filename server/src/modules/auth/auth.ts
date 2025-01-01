import userModal from '../user/user.model';
import { ReqWrapperArgs } from '../../types/ReqWrapperArgs';
import { Validator } from '../../lib/validator';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUser, User } from '../user/user.type';
import { decode } from '../../utils/encoder';
import { jwtSecret } from '../../lib/config';
import { emailSender } from '../../lib/email-sender';
import {
  generateEmailContent,
  TEMPLATE_TYPES,
} from '../../email-templates/generate-email-content';
const jwt = require('jsonwebtoken');

const RESET_PASSWORD_TOKEN_EXPIRATION_PERIOD = 1000 * 60 * 60 * 24;

class Auth {
  validateUserDetails(userData: any, validator: Validator, HttpException: any) {
    if (!validator.isString(userData.name)) {
      throw new HttpException(
        HttpException.invalidDataException('Please provide valid name')
      );
    }
    if (!validator.isEmail(userData.email)) {
      throw new HttpException(
        HttpException.invalidDataException('Please provide valid email')
      );
    }
    if (userData.password && !validator.isString(userData.password)) {
      throw new HttpException(
        HttpException.invalidDataException('Please provide valid password')
      );
    }
    if (!validator.isString(userData.profileImage)) {
      throw new HttpException(
        HttpException.invalidDataException('Please provide valid profileImage')
      );
    }
  }
  validationPasswordRules(
    userData: any,
    validator: Validator,
    HttpException: any
  ) {
    if (!validator.isPasswordLength(userData)) {
      throw new HttpException(
        HttpException.invalidDataException(
          'Password must be at least 8 characters long'
        )
      );
    }
    if (!validator.validateStrongPassword(userData)) {
      throw new HttpException(
        HttpException.invalidDataException(
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
      );
    }
  }

  validateFile(
    file: Express.Multer.File,
    HttpException: any,
    maxFileSize: number = 3 * 1024 * 1024,
    allowedFileTypes: string[] = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
    ]
  ) {
    if (file.size > maxFileSize) {
      throw HttpException.fileValidationError(
        'File size exceeds the 3MB limit.'
      );
    }

    if (!allowedFileTypes.includes(file.mimetype)) {
      throw HttpException.fileValidationError(
        'Invalid file type. Only PNG, JPG, JPEG, and WEBP are allowed.'
      );
    }
  }

  validationUserLogin(userData: any, validator: Validator, HttpException: any) {
    if (!validator.isEmail(userData.email)) {
      throw new HttpException(
        HttpException.invalidCredentialsException('Please provide valid email')
      );
    }
    if (!validator.isString(userData.password)) {
      throw new HttpException(
        HttpException.invalidCredentialsException(
          'Please provide valid password'
        )
      );
    }
  }

  getUserDetailsAndToken(user: any) {
    const payload = { userId: user._id };
    const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, jwtSecret, { expiresIn: '7d' });

    return { accessToken, refreshToken, user };
  }

  async login({ body, validator, HttpException }: ReqWrapperArgs) {
    this.validationUserLogin(body, validator, HttpException);
    const user = await userModal.getUserWithEmailAndPassword({
      email: body.email,
      password: body.password,
      isAdminUser: false,
    });
    if (!user) {
      throw new HttpException(
        HttpException.invalidCredentialsException(
          'Invalid user email or password'
        )
      );
    }

    return this.getUserDetailsAndToken(user);
  }

  async adminLogin({ body, validator, HttpException }: ReqWrapperArgs) {
    console.log('adminLogin');
    this.validationUserLogin(body, validator, HttpException);
    const user = await userModal.getUserWithEmailAndPassword({
      email: body.email,
      password: body.password,
      isAdminUser: true,
    });
    if (!user) {
      throw new HttpException(
          HttpException.invalidCredentialsException(
              'Invalid user email or password'
          )
      );
    }

    return this.getUserDetailsAndToken(user);
  }

  async validateEmailExistence({
    email,
    HttpException,
  }: {
    email: string;
    HttpException: any;
  }) {
    const userWithEmail = await userModal.fetchUserWithEmail({ email });
    if (userWithEmail) {
      throw new HttpException(
        HttpException.duplicateException(
          'This email id is already used, please use different email id'
        )
      );
    }
  }

  async signup({ body, file, validator, HttpException }: ReqWrapperArgs) {
    if (file) {
      this.validateFile(file, HttpException);
    }
    this.validateUserDetails(
      {
        ...body,
        profileImage: file.location,
      },
      validator,
      HttpException
    );
    this.validationPasswordRules(body.password, validator, HttpException);
    await this.validateEmailExistence({ email: body.email, HttpException });
    const emailConfirmationToken = uuidv4();
    const user = await userModal.createUser({
      ...body,
      profileImage: file.location,
      emailConfirmationToken,
    });
    // Setting the wait time does not works here, we need to set the await here for sending the email here
    await this.sendSignupEmail({
      toEmail: body.email,
      emailConfirmationToken,
      userName: body.name,
      waitForSuccess: false,
    });
    return this.getUserDetailsAndToken(user);
  }

  async sendSignupEmail({
    toEmail,
    userName,
    emailConfirmationToken,
    waitForSuccess = true,
  }: {
    toEmail: string;
    userName: string;
    emailConfirmationToken: string;
    waitForSuccess?: boolean;
  }) {
    try {
      const emailTemplate = generateEmailContent({
        templateType: TEMPLATE_TYPES.SIGNUP,
        userEmail: toEmail,
        userName: userName,
        emailConfirmationToken,
      });
      await emailSender.sendEmail({
        to: toEmail,
        subject: 'Confirm Email',
        text: emailTemplate,
        html: emailTemplate,
      });
    } catch (e) {
      if (!waitForSuccess) {
        throw e;
      }
    }
  }

  async changePassword({
    userId,
    body,
    validator,
    HttpException,
  }: ReqWrapperArgs) {
    const { oldPassword, newPassword } = body;
    this.validationPasswordRules(body.newPassword, validator, HttpException);
    const userDetails = await userModal.getUserDetails({ userId });
    const { password: oldPasswordDb } = userDetails;
    if (decode(oldPasswordDb) !== oldPassword) {
      throw new HttpException(
        HttpException.invalidDataException('Old password does not match')
      );
    }
    await userModal.updateUserPassword({ userId, password: newPassword });
    return {};
  }

  async sendResetPasswordLink({ body }: ReqWrapperArgs) {
    const { email } = body;
    const userDetails = await userModal.fetchUserWithEmail({ email });

    if (!userDetails) {
      return {};
    }
    const resetPasswordToken = uuidv4();
    const resetPasswordExpires =
      Date.now() + RESET_PASSWORD_TOKEN_EXPIRATION_PERIOD;
    await userModal.updateForgotPasswordToken({
      email,
      resetPasswordToken,
      resetPasswordExpires,
    });
    await this.sendForgotPasswordEmail({
      toEmail: email as string,
      userName: userDetails.name as string,
      resetPasswordToken: resetPasswordToken as string,
    });
    return {};
  }

  async sendForgotPasswordEmail({
    toEmail,
    userName,
    resetPasswordToken,
  }: {
    toEmail: string;
    userName: string;
    resetPasswordToken: string;
  }) {
    const emailTemplate = generateEmailContent({
      templateType: TEMPLATE_TYPES.FORGOT_PASSWORD,
      userEmail: toEmail,
      userName: userName,
      resetPasswordToken,
    });

    await emailSender.sendEmail({
      to: toEmail,
      subject: 'Reset Password',
      text: emailTemplate,
      html: emailTemplate,
    });
  }

  async emailValidation(userId: any, body: any, HttpException: any) {
    const { email } = body;
    const userDetails =
      await userModal.fetchUserWithMatchingEmailAndNotMatchingUserId({
        userId,
        email,
      });
    if (userDetails) {
      throw new HttpException(
        HttpException.duplicateException('Email already exists')
      );
    }
  }

  async validateResetPasswordToken({ params, HttpException }: ReqWrapperArgs) {
    const { resetPasswordToken } = params;
    await this._validateResetPasswordToken({
      resetPasswordToken,
      HttpException,
    });
  }

  async _validateResetPasswordToken({
    resetPasswordToken,
    HttpException,
  }: {
    resetPasswordToken: string;
    HttpException: ReqWrapperArgs['HttpException'];
  }) {
    const userDetails = await userModal.fetchUserWithResetToken({
      resetPasswordToken,
    });
    if (!userDetails) {
      throw new HttpException(
        HttpException.invalidCredentialsException(
          'Reset password link is not valid'
        )
      );
    }
    const { resetPasswordExpires } = userDetails;
    if ((resetPasswordExpires as number) < Date.now()) {
      throw new HttpException(
        HttpException.invalidCredentialsException(
          'Reset password token has been expired'
        )
      );
    }
  }

  async resetPassword({ body, validator, HttpException }: ReqWrapperArgs) {
    const { password, resetPasswordToken } = body;
    await this._validateResetPasswordToken({
      resetPasswordToken,
      HttpException,
    });
    this.validationPasswordRules(password, validator, HttpException);
    const { _id } = (await userModal.fetchUserWithResetToken({
      resetPasswordToken,
    })) as any;
    await userModal.updateUserPassword({
      userId: _id.toString(),
      password,
    });
  }

  async editUserDetails({
    body,
    userId,
    file,
    validator,
    HttpException,
  }: ReqWrapperArgs) {
    const profileImage = file ? file.location : body.profileImage;
    if (file) {
      this.validateFile(file, HttpException);
    }
    await this.emailValidation(userId, body, HttpException);
    const userDetails = {
      ...body,
      profileImage: profileImage,
    };
    this.validateUserDetails(userDetails, validator, HttpException);
    await userModal.updateUser(<UpdateUser>{ ...userDetails, userId });
    return userModal.fetchUser({ userId });
  }

  async fetchUserDetails({ userId }: ReqWrapperArgs) {
    return await userModal.fetchUser({
      userId,
    });
  }

  async refresh({ HttpException, body }: ReqWrapperArgs) {
    const { refreshToken } = body;

    if (!refreshToken) {
      throw new HttpException(
        HttpException.forbiddenException('Refresh token is required')
      );
    }

    try {
      const { userId } = await jwt.verify(refreshToken, jwtSecret);
      const payload = { userId };
      const user = await userModal.fetchUser({ userId });
      if (!user) {
        throw new Error('User not found');
      }
      const newAccessToken = jwt.sign(payload, jwtSecret, { expiresIn: '15m' });
      return { accessToken: newAccessToken };
    } catch {
      throw new HttpException(
        HttpException.forbiddenException('Invalid refresh token')
      );
    }
  }

  async checkLogin({ userId }: ReqWrapperArgs) {
    return userModal.fetchUser({ userId });
  }

  async resendVerificationEmail({ userId }: ReqWrapperArgs) {
    const user = (await userModal.fetchUser({
      userId,
    })) as User;
    await this.sendSignupEmail({
      toEmail: user.email as string,
      userName: user.name as string,
      emailConfirmationToken: user.emailConfirmationToken as string,
    });
    return {};
  }

  async validateConfirmEmailToken({ params, userId }: ReqWrapperArgs) {
    const { emailConfirmationToken } = params;
    const user = (await userModal.fetchUserWithConfirmEmailToken({
      emailConfirmationToken,
    })) as User;

    if (!user || (userId && user._id.toString() !== userId.toString())) {
      return { status: 'INVALID_TOKEN' };
    }

    if (user.isUserEmailConfirmed) {
      return { status: 'ALREADY_CONFIRMED' };
    }

    await userModal.confirmUserEmailConfirmationStatus(user._id);
    return { status: 'CONFIRMED' };
  }
}

export default new Auth();
