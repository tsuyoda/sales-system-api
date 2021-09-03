import { Schema } from 'mongoose';
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
    const role = await RoleModel.findByIdAndUpdate(id, data);

    if (!role) {
      throw new ApiError(404, 'role not found');
    }

    return role;
  }

  async list(data: IRoleParams): Promise<IDbRole[]> {
    const { name } = data;

    const payload: IRoleSearchFields = {};

    if (name) {
      const regex = new RegExp(name, 'i');
      payload.name = { $regex: regex };
    }

    return RoleModel.find(data);
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
