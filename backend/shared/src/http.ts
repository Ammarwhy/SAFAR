import type { Request, Response } from 'express';
import { ApiError } from './errors';
import { toErrorShape } from './errors';

export const sendError = (res: Response, error: ApiError): Response => {
  return res.status(error.status).json(toErrorShape(error));
};

export const asyncHandler =
  <TReq extends Request = Request>(handler: (req: TReq, res: Response) => Promise<void> | void) =>
  (req: TReq, res: Response, next: (err?: unknown) => void): void => {
    Promise.resolve(handler(req, res)).catch(next);
  };

export const jsonOk = <T>(res: Response, data: T, status = 200): Response => {
  return res.status(status).json({ data });
};
