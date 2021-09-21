import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/auth';

import ApiError from '../../core/exceptions/ApiError';
import { IDecodedJWT } from '../../core/interfaces/IAuth';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || '';

  const [, token] = authHeader?.split(' ');

  if (!token) {
    throw new ApiError(401, 'token é obrigatório');
  }

  Jwt.verify(token, JWT_SECRET, (err, decoded: IDecodedJWT) => {
    if (err) {
      throw new ApiError(401, 'token inválido ou expirado');
    }

    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
  });

  next();
};

export default auth;
