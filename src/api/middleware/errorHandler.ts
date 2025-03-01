import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      error: {
        message: error.message,
        code: error.code
      }
    });
  }

  // Log unexpected errors
  console.error(error);

  return res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }
  });
};