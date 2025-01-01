export type User = {
  userId?: string;
  _id?: any;
  name?: string;
  email?: string;
  password?: string;
  type?: string[];
  isUserEmailConfirmed?: boolean;
  measurementType?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
  profileImage?: string;
  emailConfirmationToken?: string;
  isAdminUser?: boolean;
};

export type UpdateUser = {
  userId: string;
  name: string;
  email: string;
  type: string;
  profileImage: string;
  measurementType: string;
};
