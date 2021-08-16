import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';

class IndexController extends Controller {
  async index(_req: Request, res: Response, next: NextFunction) {
    try {
      super.response(res, 'Sales System API - Version 1.0');
    } catch (err) {
      next(err);
    }
  }
}

export default new IndexController();
