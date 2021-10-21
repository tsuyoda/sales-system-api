import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import CustomerService from '../../core/services/CustomerService';
import CustomerValidator from '../validators/CustomerValidator';
import SharedValidator from '../validators/SharedValidator';

class CustomerController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CustomerValidator.create(req);

      const customer = await CustomerService.create(data);

      super.response(res, customer);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...data } = await CustomerValidator.update(req);

      const customer = await CustomerService.update(id, data);

      super.response(res, customer);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CustomerValidator.list(req);

      const { docs, ...paginator } = await CustomerService.list(data);

      super.response(res, docs, 200, paginator);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const customer = await CustomerService.show(id);

      super.response(res, customer);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const customer = await CustomerService.delete(id);

      super.response(res, customer);
    } catch (err) {
      next(err);
    }
  }
}

export default new CustomerController();
