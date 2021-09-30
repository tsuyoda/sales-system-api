import { Schema } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import ApiError from '../exceptions/ApiError';
import { IDbRole, IRoleData, IRoleParams, IRoleSearchFields } from '../interfaces/IRole';
import RoleModel from '../models/RoleModel';

class RoleService {
  async create(data: IRoleData): Promise<IDbRole> {
    const { name } = data;

    if (await RoleModel.findOne({ name })) {
      throw new ApiError(400, 'name already in use');
    }

    return RoleModel.create(data);
  }

  async update(id: string | Schema.Types.ObjectId, data: IRoleData): Promise<IDbRole> {
    const { name } = data;

    if (await RoleModel.findOne({ name })) {
      throw new ApiError(400, 'name already in use');
    }

    const role = await RoleModel.findByIdAndUpdate(id, data);

    if (!role) {
      throw new ApiError(404, 'role not found');
    }

    return role;
  }

  async list(data: IRoleParams): Promise<PaginationModel<IDbRole>> {
    const { name, page, limit, sort } = data;

    const payload: IRoleSearchFields = {};

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

    const results = await RoleModel.paginate(options);

    if (!results) {
      return {} as PaginationModel<IDbRole>;
    }

    return results;
  }

  async show(id: string | Schema.Types.ObjectId): Promise<IDbRole> {
    const role = await RoleModel.findById(id);

    if (!role) {
      throw new ApiError(404, 'role not found');
    }

    return role;
  }

  async delete(id: string | Schema.Types.ObjectId): Promise<IDbRole> {
    const role = await RoleModel.findByIdAndDelete(id);

    if (!role) {
      throw new ApiError(404, 'role not found');
    }

    return role;
  }
}

export default new RoleService();
