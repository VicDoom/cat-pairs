import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import type { MyUserRequest } from '../helpers/types';
import { ApiError } from '../error/ApiError';
import type { User } from '../helpers/types';

export const authMiddleware = (
  expressRequest: Request,
  _res: Response,
  next: NextFunction
) => {
  if (expressRequest.method === 'OPTIONS') {
    next();
  }
  try {
    if (!expressRequest.headers.authorization) {
      return next(ApiError.forbidden('Пользователь не авторизован'));
    }
    const token = expressRequest.headers.authorization.split(' ')[1];
    if (!token) {
      next(ApiError.forbidden('Пользователь не авторизован'));
    }

    const decoder = jwt.verify(token, process.env.SECRET_KEY as string);
    const req = expressRequest as MyUserRequest;
    req.user = decoder as User;

    next();
  } catch (e: any) {
    next(ApiError.forbidden(e.message));
  }
};