import { Schema } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import ApiError from '../exceptions/ApiError';
import { IDbRole, IRoleData, IRoleParams, IRoleSearchFields } from '../interfaces/IRole';
import RoleModel from '../models/RoleModel';
import ResourceModel from './../models/ResourceModel';

class RoleService {
  async create(data: IRoleData): Promise<IDbRole> {
    const { name, permissions } = data;

    const findByName = await RoleModel.findOne({ name });

    if (findByName) {
      throw new ApiError(400, 'name already in use');
    }

    await this.permissionsValidation(permissions);

    return RoleModel.create(data);
  }

  async update(id: string | Schema.Types.ObjectId, data: IRoleData): Promise<IDbRole> {
    const { name, permissions } = data;

    const findByName = await RoleModel.findOne({ name });

    if (findByName && (id ? findByName._id.toString() !== id : true)) {
      throw new ApiError(400, 'name already in use');
    }

    await this.permissionsValidation(permissions);

    const role = await RoleModel.findByIdAndUpdate(id, data);

    if (!role) {
      throw new ApiError(404, 'role not found');
    }

    return role;
  }

  async list(data: IRoleParams): Promise<PaginationModel<IDbRole>> {
    const { name, page, limit, sort, isAdmin, ...rest } = data;

    const payload: IRoleSearchFields = { ...rest };

    if (!isAdmin) {
      payload.isAdmin = false;
    }

    if (name) {
      const names = Array.isArray(name) ? name : [name];
      const namesRegex = names.map(item => new RegExp(item, 'i'));

      payload.name = { $in: namesRegex };
    }

    const options = {
      query: payload,
      sort: { createdAt: sort },
      populate: 'permissions.resource',
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
    const role = await RoleModel.findById(id).populate('permissions.resource');

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

  private async permissionsValidation(permissions): Promise<void> {
    for (const permission of permissions) {
      const resource = await ResourceModel.findById(permission.resource);

      if (!resource) {
        throw new ApiError(400, `Recurso de id ${resource} não existe`);
      }

      permission.actions.forEach(action => {
        if (!resource.availableActions.includes(action)) {
          throw new ApiError(
            400,
            `Ação '${action}' não disponível para o recurso '${resource.name}' de id'${resource._id}'. ` +
              `Ações disponíveis: ${resource.availableActions}`
          );
        }
      });
    }
  }
}

export default new RoleService();
