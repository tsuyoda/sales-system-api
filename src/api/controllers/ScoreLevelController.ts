import { NextFunction, Request, Response } from 'express';

import Controller from './Controller';
import SharedValidator from '../validators/SharedValidator';
import ScoreLevelValidator from '../validators/ScoreLevelValidator';
import ScoreLevelService from '../../core/services/ScoreLevelService';

class ScoreLevelController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ScoreLevelValidator.create(req);

      const scoreLevel = await ScoreLevelService.create(data);

      super.response(res, scoreLevel);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, ...data } = await ScoreLevelValidator.update(req);

      const scoreLevel = await ScoreLevelService.update(id, data);

      super.response(res, scoreLevel);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ScoreLevelValidator.list(req);

      const { docs, ...paginator } = await ScoreLevelService.list(data);

      super.response(res, docs, 200, paginator);
    } catch (err) {
      next(err);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const scoreLevel = await ScoreLevelService.show(id);

      super.response(res, scoreLevel);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await SharedValidator.paramId(req);

      const scoreLevel = await ScoreLevelService.delete(id);

      super.response(res, scoreLevel);
    } catch (err) {
      next(err);
    }
  }
}

export default new ScoreLevelController();
