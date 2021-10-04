import { Schema } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import ApiError from '../exceptions/ApiError';
import { IDbProvider, IProviderData, IProviderParams, IProviderSearchFields } from '../interfaces/IProvider';
import ProviderModel from '../models/ProviderModel';

class ProviderService {
  async create(data: IProviderData): Promise<IDbProvider> {
    const { name } = data;

    if (await ProviderModel.findOne({ name })) {
      throw new ApiError(400, 'name already in use');
    }

    return ProviderModel.create(data);
  }

  async update(id: string | Schema.Types.ObjectId, data: IProviderData): Promise<IDbProvider> {
    const provider = await ProviderModel.findByIdAndUpdate(id, data);

    if (!provider) {
      throw new ApiError(404, 'provider not found');
    }

    return provider;
  }

  async list(data: IProviderParams): Promise<PaginationModel<IDbProvider>> {
    const { name, page, limit, sort } = data;

    const payload: IProviderSearchFields = {};

    if (name) {
      const regex = new RegExp(name, 'i');
      payload.name = { $regex: regex };
    }

    const options = {
      query: payload,
      sort: { createdAt: sort },
      page,
      limit,
    };

    const results = await ProviderModel.paginate(options);

    if (!results) {
      return {} as PaginationModel<IDbProvider>;
    }

    return results;
  }

  async show(id: string | Schema.Types.ObjectId): Promise<IDbProvider> {
    const provider = await ProviderModel.findById(id);

    if (!provider) {
      throw new ApiError(404, 'provider not found');
    }

    return provider;
  }

  async delete(id: string | Schema.Types.ObjectId): Promise<IDbProvider> {
    const provider = await ProviderModel.findByIdAndDelete(id);

    if (!provider) {
      throw new ApiError(404, 'provider not found');
    }

    return provider;
  }
}

export default new ProviderService();
