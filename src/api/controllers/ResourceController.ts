import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import SharedValidator from '../validators/SharedValidator';
import PermissionValidator from '../validators/ResourceValidator';
import PermissionService from '../../core/services/ResourceService';

class ResourceController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PermissionValidator.create(req);

      const role = await PermissionService.create(data);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...data } = await PermissionValidator.update(req);

      const role = await PermissionService.update(id, data);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PermissionValidator.list(req);

      const { docs, ...paginator } = await PermissionService.list(data);

      super.response(res, docs, 200, paginator);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const role = await PermissionService.show(id);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const role = await PermissionService.delete(id);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }
}

export default new ResourceController();
