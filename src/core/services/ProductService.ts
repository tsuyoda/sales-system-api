import {
  IDbProduct,
  IProductData,
  IProductParams,
  IProductSearchFields,
  IDbProductPrice,
} from '../interfaces/IProduct';

import ApiError from '../exceptions/ApiError';
import ProductModel from '../models/productModel';
import { Schema } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import ProviderModel from './../models/ProviderModel';
import ProductPriceModel from '../models/ProductPriceModel';

class ProductService {
  async create(data: IProductData): Promise<IDbProduct> {
    await this.productDataValidation(data);

    const product = await ProductModel.create(data);

    const productPriceData = {
      value: data.value,
      product: product._id,
    };

    await ProductPriceModel.create(productPriceData);

    return product;
  }

  async update(id: string, data: IProductData): Promise<IDbProduct> {
    await this.productDataValidation(data, id);

    const product = await ProductModel.findByIdAndUpdate(id, data);

    if (!product) {
      throw new ApiError(404, `Produto de id ${id} não existe`);
    }

    if (product.value !== data.value) {
      const productPriceData = {
        value: data.value,
        product: product._id,
      };

      await ProductPriceModel.create(productPriceData);
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
      populate: 'provider',
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
    const product = await ProductModel.findById(id).populate('provider');

    if (!product) {
      throw new ApiError(404, `Produto de id ${id} não existe`);
    }

    return product;
  }

  async delete(id: string | Schema.Types.ObjectId): Promise<IDbProduct> {
    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
      throw new ApiError(404, `Produto de id ${id} não existe`);
    }

    return product;
  }

  async priceHistory(id: string | Schema.Types.ObjectId): Promise<IDbProductPrice[]> {
    const product = await ProductModel.findById(id);

    if (!product) {
      throw new ApiError(404, `Produto de id ${id} não existe`);
    }

    return ProductPriceModel.find({ product: product._id });
  }

  async decreaseStock(productId: string, quantity: number): Promise<void> {
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new ApiError(404, `Produto de id ${productId} não existe`);
    }

    if (quantity > product.quantity) {
      throw new ApiError(400, `Estoque insuficiente. Quantidade disponível: ${product.quantity}`);
    }

    await ProductModel.findByIdAndUpdate(productId, { quantity: product.quantity - quantity });
  }

  async increaseStock(productId: string, quantity: number): Promise<void> {
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new ApiError(404, `Produto de id ${productId} não existe`);
    }

    await ProductModel.findByIdAndUpdate(productId, { quantity: product.quantity + quantity });
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
