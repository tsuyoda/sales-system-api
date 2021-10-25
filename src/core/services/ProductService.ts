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
import ProviderModel from './../models/ProviderModel';

class ProductService {
  async create(data: IProductData): Promise<IDbProduct> {
    await this.productDataValidation(data);

    return ProductModel.create(data);
  }

  async update(id: string, data: IProductData): Promise<IDbProduct> {
    await this.productDataValidation(data, id);

    const product = await ProductModel.findByIdAndUpdate(id, data);

    if (!product) {
      throw new ApiError(404, 'product not found');
    }

    return product;
  }

  async list(data: IProductParams): Promise<PaginationModel<IDbProduct>> {
    const { title, page, limit, sort, ...rest } = data;

    const payload: IProductSearchFields = { ...rest };

    if (title) {
      const regex = new RegExp(title, 'i');
      payload.title = { $regex: regex };
    }

    const options = {
      query: payload,
      sort: { createdAt: sort },
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

  private async productDataValidation(data: IProductData, id: string = ''): Promise<void> {
    const { sku, provider } = data;

    const findBySku = await ProductModel.findOne({ sku });

    if (findBySku && (id ? findBySku._id.toString() !== id : true)) {
      throw new ApiError(400, `SKU "${sku}" já está em uso`);
    }

    if (!(await ProviderModel.findById(provider))) {
      throw new ApiError(400, `Fornecedor de id ${provider} não existe`);
    }
  }
}

export default new ProductService();
