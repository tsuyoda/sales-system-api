import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import SharedValidator from '../validators/SharedValidator';
import ScoreValidator from '../validators/ScoreValidator';
import ScoreService from '../../core/services/ScoreService';

class ScoreController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ScoreValidator.create(req);

      const score = await ScoreService.create(data);

      super.response(res, score);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...data } = await ScoreValidator.update(req);

      const score = await ScoreService.update(id, data);

      super.response(res, score);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ScoreValidator.list(req);

      const { docs, ...paginator } = await ScoreService.list(data);

      super.response(res, docs, 200, paginator);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const score = await ScoreService.show(id);

      super.response(res, score);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const score = await ScoreService.delete(id);

      super.response(res, score);
    } catch (err) {
      next(err);
    }
  }
}

export default new ScoreController();
