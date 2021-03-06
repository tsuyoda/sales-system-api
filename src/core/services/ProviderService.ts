import { Schema } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import ApiError from '../exceptions/ApiError';
import {
  IDbProvider,
  IProviderData,
  IProviderParams,
  IProviderSearchFields,
} from '../interfaces/IProvider';
import ProviderModel from '../models/ProviderModel';

class ProviderService {
  async create(data: IProviderData): Promise<IDbProvider> {
    const { fullName } = data;

    if (await ProviderModel.findOne({ fullName })) {
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
    const { fullName, doc, email, page, limit, sort } = data;

    const payload: IProviderSearchFields = {};

    if (doc) {
      payload['doc.id'] = doc;
    }

    if (email) {
      payload['contact.email'] = email;
    }

    if (fullName) {
      const regex = new RegExp(fullName, 'i');
      payload.fullName = { $regex: regex };
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

  async providerDataValidation(data: IProviderData, id = '') {
    const { fullName } = data;

    const findByName = await ProviderModel.findOne({ fullName });

    if (findByName && (id ? findByName._id.toString() !== id : true)) {
      throw new ApiError(400, `Nome de fornecedor "${fullName}" j?? est?? em uso`);
    }
  }
}

export default new ProviderService();
