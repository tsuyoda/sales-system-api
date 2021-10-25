import ApiError from '../exceptions/ApiError';
import UserModel from '../models/UserModel';
import SellerModel from './../models/SellerModel';
import { Schema } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import { IDbSeller, ISellerData, ISellerParams } from './../interfaces/ISeller';

class SellerService {
  async create(data: ISellerData): Promise<IDbSeller> {
    await this.sellerDataValidation(data);

    return SellerModel.create(data);
  }

  async update(id: string, data: ISellerData): Promise<IDbSeller> {
    await this.sellerDataValidation(data, id);

    const seller = await SellerModel.findByIdAndUpdate(id, data);

    if (!seller) {
      throw new ApiError(404, 'seller not found');
    }

    return seller;
  }

  async list(data: ISellerParams): Promise<PaginationModel<IDbSeller>> {
    const { page, limit, sort } = data;

    const options = {
      sort: { createdAt: sort },
      populate: 'user',
      page,
      limit,
    };

    const results = await SellerModel.paginate(options);

    if (!results) {
      return {} as PaginationModel<IDbSeller>;
    }

    return results;
  }

  async show(id: string | Schema.Types.ObjectId): Promise<IDbSeller> {
    const seller = await SellerModel.findById(id).populate('user');

    if (!seller) {
      throw new ApiError(404, 'seller not found');
    }

    return seller;
  }

  async delete(id: string | Schema.Types.ObjectId): Promise<IDbSeller> {
    const seller = await SellerModel.findByIdAndDelete(id);

    if (!seller) {
      throw new ApiError(404, 'seller not found');
    }

    return seller;
  }

  private async sellerDataValidation(data: ISellerData, id: string = ''): Promise<void> {
    const { user } = data;

    const findByUser = await SellerModel.findOne({ user });

    if (findByUser && (id ? findByUser._id.toString() !== id : true)) {
      throw new ApiError(400, `Usuário "${user}" já está atrelado a outro vendedor`);
    }

    if (!UserModel.findById({ user })) {
      throw new ApiError(400, `Usuário de id ${user} não existe`);
    }
  }
}

export default new SellerService();
