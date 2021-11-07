import ApiError from '../exceptions/ApiError';
import { Schema } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import { IScoreData, IDbScore, IScoreParams, IDbScoreLevel } from './../interfaces/IScore';
import ScoreModel from '../models/ScoreModel';
import CustomerModel from './../models/CustomerModel';
import ScoreLevelModel from './../models/ScoreLevelModel';
import ScoreLevelService from './ScoreLevelService';
import { IDbBenefit } from '../interfaces/IBenefit';

class ScoreService {
  async getScoreBenefitsByCustomer(customerId: string): Promise<IDbBenefit[]> {
    const score = await ScoreModel.findOne({ customer: customerId }).populate({
      path: 'scoreLevel',
      populate: { path: 'benefits' },
    });

    if (!score) {
      throw new ApiError(404, 'score not found');
    }

    const scoreLevel = score.scoreLevel as IDbScoreLevel;

    return scoreLevel.benefits as IDbBenefit[];
  }

  async getScoreByCustomer(customerId: string): Promise<IDbScore | null> {
    return ScoreModel.findOne({ customer: customerId });
  }

  async increasePoints(id: string, points: number): Promise<void> {
    const score = await ScoreModel.findById(id);

    if (!score) {
      throw new ApiError(404, 'score not found');
    }

    const newPoints = score.points + points;

    const newLevel = await ScoreLevelService.getLevelByPoints(newPoints);

    if (!newLevel || newLevel._id === score.scoreLevel) {
      await ScoreModel.findByIdAndUpdate(id, { points: newPoints });
    } else {
      await ScoreModel.findByIdAndUpdate(id, { points: newPoints, scoreLevel: newLevel._id });
    }
  }

  async create(data: IScoreData): Promise<IDbScore> {
    await this.scoreDataValidation(data);

    return ScoreModel.create(data);
  }

  async update(id: string, data: IScoreData): Promise<IDbScore> {
    await this.scoreDataValidation(data, id);

    const score = await ScoreModel.findByIdAndUpdate(id, data);

    if (!score) {
      throw new ApiError(404, 'score not found');
    }

    return score;
  }

  async list(data: IScoreParams): Promise<PaginationModel<IDbScore>> {
    const { page, limit, sort, ...params } = data;

    const options = {
      query: params,
      sort: { createdAt: sort },
      populate: [
        'customer',
        {
          path: 'scoreLevel',
          populate: {
            path: 'benefits',
          },
        },
      ],
      page,
      limit,
    };

    const results = await ScoreModel.paginate(options);

    if (!results) {
      return {} as PaginationModel<IDbScore>;
    }

    return results;
  }

  async show(id: string | Schema.Types.ObjectId): Promise<IDbScore> {
    const score = await ScoreModel.findById(id).populate(['customer', 'scoreLevel']);

    if (!score) {
      throw new ApiError(404, 'score not found');
    }

    return score;
  }

  async delete(id: string | Schema.Types.ObjectId): Promise<IDbScore> {
    const score = await ScoreModel.findByIdAndDelete(id);

    if (!score) {
      throw new ApiError(404, 'score not found');
    }

    return score;
  }

  private async scoreDataValidation(data: IScoreData, id: string = ''): Promise<void> {
    const { customer, scoreLevel } = data;

    const findByCustomer = await ScoreModel.findOne({ customer });

    if (findByCustomer && (id ? findByCustomer._id.toString() !== id : true)) {
      throw new ApiError(400, `Cliente "${customer}" já está sendo utilizado por outro registro`);
    }

    if (!(await CustomerModel.findById(customer))) {
      throw new ApiError(400, `Cliente de id ${customer} não existe`);
    }

    if (!(await ScoreLevelModel.findById(scoreLevel))) {
      throw new ApiError(400, `Nível de id ${scoreLevel} não existe`);
    }
  }
}

export default new ScoreService();
