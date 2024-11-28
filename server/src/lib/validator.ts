export class Validator {
  isString(value: any) {
    return typeof value === 'string';
  }

  isEmail(value: any) {
    if (!this.isString(value)) {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  isPasswordLength(value: any) {
    return value.length >= 8;
  }

  validateStrongPassword(value: any) {
    if (!this.isString(value)) {
      return false;
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordPattern.test(value);
  }
}

export const validator = new Validator();
