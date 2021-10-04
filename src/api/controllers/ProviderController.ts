import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import ProviderService from '../../core/services/ProviderService';
import ProviderValidator from '../validators/ProviderValidator';
import SharedValidator from '../validators/SharedValidator';

class ProviderController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProviderValidator.create(req);

      const provider = await ProviderService.create(data);

      super.response(res, provider);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...data } = await ProviderValidator.update(req);

      const provider = await ProviderService.update(id, data);

      super.response(res, provider);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProviderValidator.list(req);

      const { docs, ...paginator } = await ProviderService.list(data);

      super.response(res, docs, 200, paginator);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const provider = await ProviderService.show(id);

      super.response(res, provider);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const provider = await ProviderService.delete(id);

      super.response(res, provider);
    } catch (err) {
      next(err);
    }
  }
}

export default new ProviderController();
