import { NextFunction, Request, Response } from 'express';
import AuthService from '../../core/services/AuthService';
import AuthValidator from '../validators/AuthValidator';

import Controller from './Controller';

class AuthController extends Controller {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthValidator.authenticate(req);

      const authorization = await AuthService.authenticate(data);

      super.response(res, authorization);
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
