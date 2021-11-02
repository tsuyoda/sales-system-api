import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import UserService from '../../core/services/UserService';
import ApiError from '../../core/exceptions/ApiError';
import ProfileValidator from '../validators/ProfileValidator';
import ProfileService from '../../core/services/ProfileService';

class ProfileController extends Controller {
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(403, 'Usuário não encontrado');
      }

      const { id } = req.user;

      const user = await UserService.show(id.toString());

      super.response(res, user);
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(403, 'Usuário não encontrado');
      }

      const data = await ProfileValidator.resetPassword(req);

      await ProfileService.resetPassword(req.user.id, data);

      super.response(res, { message: 'Senha alterada com sucesso!' });
    } catch (err) {
      next(err);
    }
  }
}

export default new ProfileController();
