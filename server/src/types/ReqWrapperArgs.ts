import { HttpException } from '../lib/HttpException';
import { Validator } from '../lib/validator';

export type ReqWrapperArgs = {
  body: Record<string, any>;
  params: Record<string, any>;
  query: Record<string, any>;
  userId: string;
  validator: Validator;
  HttpException: typeof HttpException;
  file: any;
};
