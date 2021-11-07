import { Schema } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import ApiError from '../exceptions/ApiError';
import ScoreLevelModel from '../models/ScoreLevelModel';
import BenefitModel from '../models/BenefitModel';
import {
  IScoreLevelData,
  IDbScoreLevel,
  IScoreLevelParams,
  IScoreLevelSearchFields,
} from '../interfaces/IScore';

class ScoreLevelService {
  async getLevelByPoints(points: number): Promise<IDbScoreLevel | null> {
    return ScoreLevelModel.findOne({ pointsThreshold: { $lte: points } });
  }

  async create(data: IScoreLevelData): Promise<IDbScoreLevel> {
    const { name, benefits } = data;

    const findByName = await ScoreLevelModel.findOne({ name });

    if (findByName) {
      throw new ApiError(400, 'name already in use');
    }

    await this.benefitsValidation(benefits);

    return ScoreLevelModel.create(data);
  }

  async update(id: string | Schema.Types.ObjectId, data: IScoreLevelData): Promise<IDbScoreLevel> {
    const { name, benefits } = data;

    const findByName = await ScoreLevelModel.findOne({ name });

    if (findByName && (id ? findByName._id.toString() !== id : true)) {
      throw new ApiError(400, 'name already in use');
    }

    await this.benefitsValidation(benefits);

    const scoreLevel = await ScoreLevelModel.findByIdAndUpdate(id, data);

    if (!scoreLevel) {
      throw new ApiError(404, 'score level not found');
    }

    return scoreLevel;
  }

  async list(data: IScoreLevelParams): Promise<PaginationModel<IDbScoreLevel>> {
    const { name, page, limit, sort } = data;

    const payload: IScoreLevelSearchFields = {};

    if (name) {
      payload.name = { $regex: new RegExp(name, 'i') };
    }

    const options = {
      query: payload,
      sort: { createdAt: sort },
      populate: 'benefits',
      page,
      limit,
    };

    const results = await ScoreLevelModel.paginate(options);

    if (!results) {
      return {} as PaginationModel<IDbScoreLevel>;
    }

    return results;
  }

  async show(id: string | Schema.Types.ObjectId): Promise<IDbScoreLevel> {
    const scoreLevel = await ScoreLevelModel.findById(id).populate('benefits');

    if (!scoreLevel) {
      throw new ApiError(404, 'score level not found');
    }

    return scoreLevel;
  }

  async delete(id: string | Schema.Types.ObjectId): Promise<IDbScoreLevel> {
    const scoreLevel = await ScoreLevelModel.findByIdAndDelete(id);

    if (!scoreLevel) {
      throw new ApiError(404, 'score level not found');
    }

    return scoreLevel;
  }

  private async benefitsValidation(benefits): Promise<void> {
    for (const benefitId of benefits) {
      const benefit = await BenefitModel.findById(benefitId);

      if (!benefit) {
        throw new ApiError(400, `Benefício de id ${benefitId} não existe`);
      }
    }
  }
}

export default new ScoreLevelService();
