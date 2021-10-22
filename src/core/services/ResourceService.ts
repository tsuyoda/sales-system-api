import { Schema } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import ApiError from '../exceptions/ApiError';
import {
  IResourceData,
  IDbResource,
  IResourceParams,
  IResourceSearchFields,
} from './../interfaces/IResource';
import ResourceModel from './../models/ResourceModel';

class ResourceService {
  async create(data: IResourceData): Promise<IDbResource> {
    const { name } = data;

    if (await ResourceModel.findOne({ name })) {
      throw new ApiError(400, 'Resource already exists');
    }

    return ResourceModel.create(data);
  }

  async update(id: string | Schema.Types.ObjectId, data: IResourceData): Promise<IDbResource> {
    const { name } = data;

    const findResource = await ResourceModel.findOne({ name });

    if (findResource && (id ? findResource._id.toString() !== id : true)) {
      throw new ApiError(400, 'Resource already exists');
    }

    const resource = await ResourceModel.findByIdAndUpdate(id, data);

    if (!resource) {
      throw new ApiError(404, 'Resource not found');
    }

    return resource;
  }

  async list(data: IResourceParams): Promise<PaginationModel<IDbResource>> {
    const { name, page, limit, sort } = data;

    const payload = {} as IResourceSearchFields;

    if (name) {
      payload.name = name;
    }

    const options = {
      query: payload,
      sort: { createdAt: sort },
      page,
      limit,
    };

    const results = await ResourceModel.paginate(options);

    if (!results) {
      return {} as PaginationModel<IDbResource>;
    }

    return results;
  }

  async show(id: string | Schema.Types.ObjectId): Promise<IDbResource> {
    const resource = await ResourceModel.findById(id);

    if (!resource) {
      throw new ApiError(404, 'Resource not found');
    }

    return resource;
  }

  async delete(id: string | Schema.Types.ObjectId): Promise<IDbResource> {
    const resource = await ResourceModel.findByIdAndDelete(id);

    if (!resource) {
      throw new ApiError(404, 'Resource not found');
    }

    return resource;
  }
}

export default new ResourceService();
