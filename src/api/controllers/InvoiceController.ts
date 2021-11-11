import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import SharedValidator from '../validators/SharedValidator';
import InvoiceValidator from '../validators/InvoiceValidator';
import InvoiceService from '../../core/services/InvoiceService';

class OrderController extends Controller {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await InvoiceValidator.list(req);

      const { docs, ...paginator } = await InvoiceService.list(data);

      super.response(res, docs, 200, paginator);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const order = await InvoiceService.show(id);

      super.response(res, order);
    } catch (err) {
      next(err);
    }
  }
}

export default new OrderController();
