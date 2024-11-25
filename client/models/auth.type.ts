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
  type: 'coach' | 'athlete' | 'both';
  profileImage: FormData | string;
  measurementType: 'KMs' | 'miles';
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'coach' | 'athlete' | 'both';
  profileImage: string;
  isUserEmailConfirmed: boolean;
  emailConfirmationToken?: string;
  measurementType: 'KMs' | 'miles';
}
