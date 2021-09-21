import ApiError from '../exceptions/ApiError';
import { IDbUser, IUserData, IUserParams, IUserSearchFields } from '../interfaces/IUser';
import UserModel from '../models/UserModel';
import RoleModel from '../models/roleModel';
import { Schema } from 'mongoose';

class UserService {
  async create(data: IUserData): Promise<IDbUser> {
    await this.userDataValidation(data);

    return UserModel.create(data);
  }

  async update(id: string | Schema.Types.ObjectId, data: IUserData): Promise<IDbUser> {
    await this.userDataValidation(data);

    const user = await UserModel.findByIdAndUpdate(id, data);

    if (!user) {
      throw new ApiError(404, 'user not found');
    }

    return user;
  }

  async list(data: IUserParams): Promise<IDbUser[]> {
    const { name, fullName, ...rest } = data;

    const payload: IUserSearchFields = { ...rest };

    if (name) {
      payload.name = { $regex: new RegExp(name, 'i') };
    }

    if (fullName) {
      payload.fullName = { $regex: new RegExp(fullName, 'i') };
    }

    return UserModel.find(payload);
  }

  async show(id: string | Schema.Types.ObjectId): Promise<IDbUser> {
    const user = await UserModel.findById(id);

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

  private async userDataValidation(data: IUserData): Promise<void> {
    const { name, email, role, password } = data;

    const regex = new RegExp(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
    );

    if (!regex.test(password)) {
      throw new ApiError(
        400,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character'
      );
    }

    if (await UserModel.findOne({ name })) {
      throw new ApiError(400, 'name already in use');
    }

    if (await UserModel.findOne({ email })) {
      throw new ApiError(400, 'email already in use');
    }

    if (!(await RoleModel.findById(role))) {
      throw new ApiError(400, 'role does not exist');
    }
  }
}

export default new UserService();
