import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import SharedValidator from '../validators/SharedValidator';
import ApiError from '../../core/exceptions/ApiError';
import SellerValidator from '../validators/SellerValidator';
import SellerService from '../../core/services/SellerService';

class SellerController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await SellerValidator.create(req);

      const seller = await SellerService.create(data);

      super.response(res, seller);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...data } = await SellerValidator.update(req);

      const seller = await SellerService.update(id, data);

      super.response(res, seller);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await SellerValidator.list(req);

      const { docs, ...paginator } = await SellerService.list(data);

      super.response(res, docs, 200, paginator);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const seller = await SellerService.show(id);

      super.response(res, seller);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const seller = await SellerService.delete(id);

      super.response(res, seller);
    } catch (err) {
      next(err);
    }
  }
}

export default new SellerController();
