import type { NextFunction, Request, Response } from 'express';
import { ApiError, toErrorShape } from '../../../shared/src/errors';

export const globalErrorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (error instanceof ApiError) {
    res.status(error.status).json(toErrorShape(error));
    return;
  }

  console.error(error);
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Unexpected server error',
    },
  });
};
