import { Errback, NextFunction, Request, Response } from 'express';

import ApiError from '../../core/exceptions/ApiError';

const handleError = (err: Errback, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      error: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    error: 'Internal Server Error',
  });
};

export default handleError;
