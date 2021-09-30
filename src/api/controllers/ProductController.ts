import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import ProductService from '../../core/services/ProductService';
import ProductValidator from '../validators/ProductValidator';
import SharedValidator from '../validators/SharedValidator';

class ProductController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductValidator.create(req);

      const product = await ProductService.create(data);

      super.response(res, product);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...data } = await ProductValidator.update(req);

      const product = await ProductService.update(id, data);

      super.response(res, product);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductValidator.list(req);

      const { docs, ...paginator } = await ProductService.list(data);

      super.response(res, docs, 200, paginator);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const product = await ProductService.show(id);

      super.response(res, product);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const product = await ProductService.delete(id);

      super.response(res, product);
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductController();
