import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import RoleService from '../../core/services/RoleService';
import RoleValidator from '../validators/RoleValidator';
import SharedValidator from '../validators/SharedValidator';

class RoleController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RoleValidator.create(req);

      const role = await RoleService.create(data);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...data } = await RoleValidator.update(req);

      const role = await RoleService.update(id, data);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RoleValidator.list(req);

      const { docs, ...paginator } = await RoleService.list({
        ...data,
        isAdmin: req.user?.isAdmin,
      });

      super.response(res, docs, 200, paginator);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const role = await RoleService.show(id);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const role = await RoleService.delete(id);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }
}

export default new RoleController();
