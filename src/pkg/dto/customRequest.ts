import { Request } from "express";
export interface CustomRequest<T> extends Request {
  body: T;
}

export interface TokenRequest extends Request {
  user: any;
}
