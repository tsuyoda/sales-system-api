import { Schema } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import ApiError from '../exceptions/ApiError';
import {
  IDbBenefit,
  IBenefitData,
  IBenefitParams,
  IBenefitSearchFields,
} from '../interfaces/IBenefit';
import BenefitModel from '../models/BenefitModel';

class BenefitService {
  async create(data: IBenefitData): Promise<IDbBenefit> {
    const { name } = data;

    if (await BenefitModel.findOne({ name })) {
      throw new ApiError(400, 'Benefit already exists');
    }

    return BenefitModel.create(data);
  }

  async update(id: string | Schema.Types.ObjectId, data: IBenefitData): Promise<IDbBenefit> {
    const { name } = data;

    const findBenefit = await BenefitModel.findOne({ name });

    if (findBenefit && (id ? findBenefit._id.toString() !== id : true)) {
      throw new ApiError(400, 'Benefit already exists');
    }

    const benefit = await BenefitModel.findByIdAndUpdate(id, data);

    if (!benefit) {
      throw new ApiError(404, 'Benefit not found');
    }

    return benefit;
  }

  async list(data: IBenefitParams): Promise<PaginationModel<IDbBenefit>> {
    const { name, page, limit, sort } = data;

    const payload: IBenefitSearchFields = {};

    if (name) {
      payload.name = { $regex: new RegExp(name, 'i') };
    }

    const options = {
      query: payload,
      sort: { createdAt: sort },
      page,
      limit,
    };

    const results = await BenefitModel.paginate(options);

    if (!results) {
      return {} as PaginationModel<IDbBenefit>;
    }

    return results;
  }

  async show(id: string | Schema.Types.ObjectId): Promise<IDbBenefit> {
    const benefit = await BenefitModel.findById(id);

    if (!benefit) {
      throw new ApiError(404, 'Benefit not found');
    }

    return benefit;
  }

  async delete(id: string | Schema.Types.ObjectId): Promise<IDbBenefit> {
    const benefit = await BenefitModel.findByIdAndDelete(id);

    if (!benefit) {
      throw new ApiError(404, 'Benefit not found');
    }

    return benefit;
  }
}

export default new BenefitService();
