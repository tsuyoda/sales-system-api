import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import SharedValidator from '../validators/SharedValidator';
import OrderManagementValidator from '../validators/OrderManagementValidator';
import OrderManagementService from '../../core/services/OrderManagementService';

class OrderManagementController extends Controller {
  async moderate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, status } = await OrderManagementValidator.moderate(req);

      const message = await OrderManagementService.moderate(id, status);

      super.response(res, message);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await OrderManagementValidator.list(req);

      const { docs, ...paginator } = await OrderManagementService.list(data);

      super.response(res, docs, 200, paginator);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const order = await OrderManagementService.show(id);

      super.response(res, order);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const order = await OrderManagementService.delete(id);

      super.response(res, order);
    } catch (err) {
      next(err);
    }
  }
}

export default new OrderManagementController();
