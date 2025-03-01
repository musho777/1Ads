import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    throw new ApiError(401, 'API key is required');
  }

  // Implementation would validate API key against database
  const isValidApiKey = true; // Placeholder

  if (!isValidApiKey) {
    throw new ApiError(401, 'Invalid API key');
  }

  next();
};