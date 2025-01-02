import mongoose from 'mongoose';
import { UpdateUser, User } from './user.type';
import { encode } from '../../utils/encoder';

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Number,
  profileImage: String,
  isUserEmailConfirmed: { type: Boolean, default: false },
  emailConfirmationToken: String,
  isAdminUser: { type: Boolean, default: false },
});
const userMongoModal = mongoose.model('user', userSchema);

class UserModal {
  async getUserWithEmailAndPassword({
    email,
    password,
    isAdminUser = false,
  }: {
    email: string;
    password: string;
    isAdminUser?: boolean;
  }) {
    return userMongoModal
      .findOne(
        {
          email,
          password: encode(password),
          isAdminUser,
        },
        { password: 0 }
      )
      .lean();
  }

  async createUser(user: User) {
    return await userMongoModal.create({
      ...user,
      password: encode(user.password as string),
    });
  }

  async updateUser({
    userId,
    name,
    email,
    profileImage,
  }: UpdateUser) {
    return userMongoModal.updateOne(
      { _id: userId },
      { name, email, profileImage }
    );
  }

  async fetchUser({ userId }: { userId: string }) {
    return userMongoModal.findOne({ _id: userId }, { password: 0 }).lean();
  }

  async fetchUserWithConfirmEmailToken({
    emailConfirmationToken,
  }: {
    emailConfirmationToken: string;
  }) {
    return userMongoModal
      .findOne({ emailConfirmationToken }, { password: 0 })
      .lean();
  }

  async confirmUserEmailConfirmationStatus(userId: string) {
    return userMongoModal.updateOne(
      { _id: userId },
      { isUserEmailConfirmed: true }
    );
  }

  async fetchUserWithEmail({ email }: { email: string }) {
    return userMongoModal.findOne({ email }, { password: 0 }).lean();
  }

  async fetchUserWithMatchingEmailAndNotMatchingUserId({
    email,
    userId,
  }: {
    email: string;
    userId: string;
  }) {
    return userMongoModal
      .findOne({ email, _id: { $ne: userId } }, { password: 0 })
      .lean();
  }

  async fetchUserWithResetToken({
    resetPasswordToken,
  }: {
    resetPasswordToken: string;
  }) {
    return userMongoModal
      .findOne({ resetPasswordToken }, { password: 0 })
      .lean();
  }

  async getUserDetails({ userId }: { userId: string }): Promise<any> {
    return userMongoModal
      .findOne({
        _id: userId,
      })
      .lean();
  }

  async updateUserPassword({
    userId,
    password,
  }: {
    userId: string;
    password: string;
  }) {
    return userMongoModal.updateOne(
      { _id: userId },
      { password: encode(password) }
    );
  }

  async updateForgotPasswordToken({
    email,
    resetPasswordToken,
    resetPasswordExpires,
  }: {
    email: string;
    resetPasswordToken: string;
    resetPasswordExpires: number;
  }) {
    return userMongoModal.updateOne(
      { email: email },
      { resetPasswordToken, resetPasswordExpires }
    );
  }
}

export default new UserModal();
