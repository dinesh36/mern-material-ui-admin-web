export const passwordValidationRules = {
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters long',
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  },
};
