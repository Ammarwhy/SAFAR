import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import { env } from '../config';
import { ApiError } from '../../../shared/src/errors';

export interface JwtPayloadShape {
  sub: string;
  email?: string;
  role?: string;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      auth?: JwtPayloadShape;
    }
  }
}

export const verifyJwt = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.header('authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    next(new ApiError('UNAUTHORIZED', 'Missing bearer token', 401));
    return;
  }

  const token = authHeader.slice('Bearer '.length);

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayloadShape;
    req.auth = payload;
    next();
  } catch {
    next(new ApiError('UNAUTHORIZED', 'Invalid or expired token', 401));
  }
};
