import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import UserService from '../../core/services/UserService';
import UserValidator from '../validators/UserValidator';
import SharedValidator from '../validators/SharedValidator';

class UserController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserValidator.create(req);

      const user = await UserService.create(data);

      super.response(res, user);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...data } = await UserValidator.update(req);

      const user = await UserService.update(id, data);

      super.response(res, user);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserValidator.list(req);

      const { docs, ...paginator } = await UserService.list(data);

      super.response(res, docs, 200, paginator);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const user = await UserService.show(id);

      super.response(res, user);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const user = await UserService.delete(id);

      super.response(res, user);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
