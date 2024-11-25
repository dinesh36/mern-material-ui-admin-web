export class HttpException extends Error {
  statusCode: number;

  constructor({
    statusCode,
    message,
  }: {
    statusCode: number;
    message: string;
  }) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }

  static notFoundException = (message?: string) => ({
    statusCode: 404,
    message: message || 'Not Found',
  });

  static invalidDataException = (message?: string) => ({
    statusCode: 400,
    message: message || 'Invalid data',
  });

  static invalidCredentialsException = (message?: string) => ({
    statusCode: 401,
    message: message || 'Invalid credentials',
  });

  static forbiddenException = (message?: string) => ({
    statusCode: 403,
    message: message || '403 Forbidden',
  });

  static duplicateException = (message?: string) => ({
    statusCode: 409,
    message: message || 'Duplicate data',
  });

  static fileValidationError(message: string) {
    return new HttpException({
      statusCode: 400,
      message: message || 'Invalid file',
    });
  }
}
