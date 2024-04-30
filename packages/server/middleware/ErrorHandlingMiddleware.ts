import { ApiError } from '../error/ApiError';
import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: { status: number; message: string },
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
    next();
  }

  res.status(500).json({ message: 'Непредвиденная ошибка' });
  next();
};
