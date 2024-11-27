export type SignInBody = {
  email: string;
  password: string;
};

export type ChangePasswordBody = {
  oldPassword: string;
  newPassword: string;
};

export interface EditUserBody {
  name: string;
  email: string;
  profileImage: FormData | string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  isUserEmailConfirmed: boolean;
  emailConfirmationToken?: string;
}
