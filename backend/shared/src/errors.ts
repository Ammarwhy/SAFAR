import { ApiErrorCode, ApiErrorShape } from './types';

export class ApiError extends Error {
  public readonly code: ApiErrorCode;
  public readonly status: number;
  public readonly details?: Record<string, unknown>;

  constructor(code: ApiErrorCode, message: string, status: number, details?: Record<string, unknown>) {
    super(message);
    this.code = code;
    this.status = status;
    if (details) this.details = details;
  }
}

export const toErrorShape = (error: ApiError): ApiErrorShape => {
  const shape: ApiErrorShape = {
    error: {
      code: error.code,
      message: error.message,
    },
  };
  if (error.details) shape.error.details = error.details;
  return shape;
};
