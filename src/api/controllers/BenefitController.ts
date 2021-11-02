import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import SharedValidator from '../validators/SharedValidator';
import BenefitValidator from '../validators/BenefitValidator';
import BenefitService from '../../core/services/BenefitService';

class BenefitController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await BenefitValidator.create(req);

      const role = await BenefitService.create(data);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...data } = await BenefitValidator.update(req);

      const role = await BenefitService.update(id, data);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await BenefitValidator.list(req);

      const { docs, ...paginator } = await BenefitService.list(data);

      super.response(res, docs, 200, paginator);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const role = await BenefitService.show(id);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const role = await BenefitService.delete(id);

      super.response(res, role);
    } catch (err) {
      next(err);
    }
  }
}

export default new BenefitController();
