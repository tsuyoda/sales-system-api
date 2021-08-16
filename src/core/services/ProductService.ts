import { IDbProduct, IProduct, IProductListData } from '../interfaces/IProduct';

import ApiError from '../exceptions/ApiError';
import Product from '../models/productModel';

class ProductService {
  async create(data: IProduct): Promise<IDbProduct> {
    const { title } = data;

    if (await Product.findOne({ title })) {
      throw new ApiError(400, 'title already in use');
    }

    return Product.create(data);
  }

  async show(productId: string): Promise<IDbProduct> {
    const product = await Product.findById(productId);

    if (!product) {
      throw new ApiError(404, 'product not found');
    }

    return product;
  }

  async list(data: IProductListData): Promise<IDbProduct[]> {
    const { title } = data;

    const payload: any = {};

    if (title) {
      const regex = new RegExp(title, 'i');
      payload.title = { $regex: regex };
    }

    return Product.find(payload);
  }

  async delete(productId: string): Promise<IDbProduct> {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      throw new ApiError(404, 'product not found');
    }

    return product;
  }

  async update(data: IProduct): Promise<IDbProduct> {
    const { id, ...payload } = data;

    const product = await Product.findByIdAndUpdate(id, payload);

    if (!product) {
      throw new ApiError(404, 'product not found');
    }

    return product;
  }
}

export default new ProductService();
