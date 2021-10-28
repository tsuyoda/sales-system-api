import ApiError from '../exceptions/ApiError';
import { IDbUser, IUserData, IUserParams, IUserSearchFields } from '../interfaces/IUser';
import UserModel from '../models/UserModel';
import RoleModel from '../models/RoleModel';
import { Schema } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';

class UserService {
  async create(data: IUserData): Promise<IDbUser> {
    await this.userDataValidation(data);

    return UserModel.create(data);
  }

  async update(id: string, data: IUserData): Promise<IDbUser> {
    await this.userDataValidation(data, id);

    const user = await UserModel.findByIdAndUpdate(id, data);

    if (!user) {
      throw new ApiError(404, 'user not found');
    }

    return user;
  }

  async list(data: IUserParams): Promise<PaginationModel<IDbUser>> {
    const { name, fullName, role, doc, page, limit, sort, isAdmin, ...rest } = data;

    const payload: IUserSearchFields = { ...rest };

    if (doc) {
      payload['doc.id'] = doc;
    }

    if (name) {
      payload.name = { $regex: new RegExp(name, 'i') };
    }

    if (fullName) {
      payload.fullName = { $regex: new RegExp(fullName, 'i') };
    }

    if (role && role.name) {
      const names = Array.isArray(role.name) ? role.name : [role.name];

      const roleParams: any = {
        name: { $in: names },
      };

      if (!isAdmin) {
        roleParams.isAdmin = false;
      }

      const roles = await RoleModel.find(roleParams);
      payload.role = { $in: roles.map(role => role._id) };
    }

    const options = {
      query: payload,
      sort: { createdAt: sort },
      populate: {
        path: 'role',
        populate: {
          path: 'permissions',
          populate: 'resource',
        },
      },
      page,
      limit,
    };

    const results = await UserModel.paginate(options);

    if (!results) {
      return {} as PaginationModel<IDbUser>;
    }

    return results;
  }

  async show(id: string | Schema.Types.ObjectId): Promise<IDbUser> {
    const user = await UserModel.findById(id).populate({
      path: 'role',
      populate: {
        path: 'permissions',
        populate: 'resource',
      },
    });

    if (!user) {
      throw new ApiError(404, 'user not found');
    }

    return user;
  }

  async delete(id: string | Schema.Types.ObjectId): Promise<IDbUser> {
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      throw new ApiError(404, 'user not found');
    }

    return user;
  }

  private async userDataValidation(data: IUserData, id: string = ''): Promise<void> {
    const { name, email, role, doc } = data;

    const findByName = await UserModel.findOne({ name });
    const findByDoc = await UserModel.findOne({ 'doc.id': doc.id });
    const findByEmail = await UserModel.findOne({ email });

    if (findByName && (id ? findByName._id.toString() !== id : true)) {
      throw new ApiError(400, `Nome de usuário "${name}" já está em uso`);
    }

    if (findByDoc && (id ? findByDoc._id.toString() !== id : true)) {
      throw new ApiError(400, `Documento "${doc.id}" já está em uso`);
    }

    if (findByEmail && (id ? findByEmail._id.toString() !== id : true)) {
      throw new ApiError(400, `E-mail de usuário "${email}" já está em uso`);
    }

    if (!(await RoleModel.findById(role))) {
      throw new ApiError(400, `Função de id ${role} não existe`);
    }
  }
}

export default new UserService();
