import {
  IDbProduct,
  IProductData,
  IProductParams,
  IProductSearchFields,
} from '../interfaces/IProduct';

import ApiError from '../exceptions/ApiError';
import ProductModel from '../models/productModel';
import { Schema } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';

class ProductService {
  async create(data: IProductData): Promise<IDbProduct> {
    const { title } = data;

    if (await ProductModel.findOne({ title })) {
      throw new ApiError(400, 'title already in use');
    }

    return ProductModel.create(data);
  }

  async update(id: string | Schema.Types.ObjectId, data: IProductData): Promise<IDbProduct> {
    const { title } = data;

    if (await ProductModel.findOne({ title })) {
      throw new ApiError(400, 'title already in use');
    }

    const product = await ProductModel.findByIdAndUpdate(id, data);

    if (!product) {
      throw new ApiError(404, 'product not found');
    }

    return product;
  }

  async list(data: IProductParams): Promise<PaginationModel<IDbProduct>> {
    const { title, page, limit } = data;

    const payload: IProductSearchFields = {};

    if (title) {
      const regex = new RegExp(title, 'i');
      payload.title = { $regex: regex };
    }

    const options = {
      query: payload,
      page,
      limit,
    };

    const results = await ProductModel.paginate(options);

    if (!results) {
      return {} as PaginationModel<IDbProduct>;
    }

    return results;
  }

  async show(id: string | Schema.Types.ObjectId): Promise<IDbProduct> {
    const product = await ProductModel.findById(id);

    if (!product) {
      throw new ApiError(404, 'product not found');
    }

    return product;
  }

  async delete(id: string | Schema.Types.ObjectId): Promise<IDbProduct> {
    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
      throw new ApiError(404, 'product not found');
    }

    return product;
  }
}

export default new ProductService();
