import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import SharedValidator from '../validators/SharedValidator';
import OrderService from '../../core/services/OrderService';
import OrderValidator from '../validators/OrderValidator';

class OrderController extends Controller {
  async generateInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const order = await OrderService.generateInvoice(id);

      super.response(res, order);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await OrderValidator.create(req);

      const order = await OrderService.create(data);

      super.response(res, order);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...data } = await OrderValidator.update(req);

      const order = await OrderService.update(id, data);

      super.response(res, order);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await OrderValidator.list(req);

      const { docs, ...paginator } = await OrderService.list(data);

      super.response(res, docs, 200, paginator);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const order = await OrderService.show(id);

      super.response(res, order);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const order = await OrderService.delete(id);

      super.response(res, order);
    } catch (err) {
      next(err);
    }
  }
}

export default new OrderController();
