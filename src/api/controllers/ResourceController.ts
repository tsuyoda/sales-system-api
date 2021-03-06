import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import SharedValidator from '../validators/SharedValidator';
import ResourceValidator from '../validators/ResourceValidator';
import ResourceService from '../../core/services/ResourceService';

class ResourceController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ResourceValidator.create(req);

      const role = await ResourceService.create(data);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...data } = await ResourceValidator.update(req);

      const role = await ResourceService.update(id, data);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ResourceValidator.list(req);

      const { docs, ...paginator } = await ResourceService.list(data);

      super.response(res, docs, 200, paginator);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const role = await ResourceService.show(id);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const role = await ResourceService.delete(id);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }
}

export default new ResourceController();
