import ApiError from '../exceptions/ApiError';
import { PaginationModel } from 'mongoose-paginate-ts';
import { IOrderData, IDbOrder, IOrderParams, IOrderSearchFields } from './../interfaces/IOrder';
import CustomerModel from './../models/CustomerModel';
import SellerModel from './../models/SellerModel';
import OrderModel from './../models/OrderModel';
import ProductModel from './../models/ProductModel';

class OrderService {
  async create(data: IOrderData): Promise<IDbOrder> {
    await this.orderDataValidation(data);

    return OrderModel.create(data);
  }

  async update(id: string, data: IOrderData): Promise<IDbOrder> {
    await this.orderDataValidation(data);

    const order = await OrderModel.findByIdAndUpdate(id, data);

    if (!order) {
      throw new ApiError(404, 'order not found');
    }

    return order;
  }

  async list(data: IOrderParams): Promise<PaginationModel<IDbOrder>> {
    const { page, limit, sort, ...rest } = data;

    const payload: IOrderSearchFields = { ...rest };

    const options = {
      query: payload,
      populate: [
        'customer',
        {
          path: 'seller',
          populate: {
            path: 'user',
          },
        },
      ],
      sort: { createdAt: sort },
      page,
      limit,
    };

    const results = await OrderModel.paginate(options);

    if (!results) {
      return {} as PaginationModel<IDbOrder>;
    }

    return results;
  }

  async show(id: string): Promise<IDbOrder> {
    const order = await OrderModel.findById(id).populate(['customer', 'seller']);

    if (!order) {
      throw new ApiError(404, 'order not found');
    }

    return order;
  }

  async delete(id: string): Promise<IDbOrder> {
    const order = await OrderModel.findByIdAndDelete(id);

    if (!order) {
      throw new ApiError(404, 'order not found');
    }

    return order;
  }

  private async orderDataValidation(data: IOrderData): Promise<void> {
    const { customer, seller, items } = data;

    if (!(await CustomerModel.findById(customer))) {
      throw new ApiError(400, `Cliente de id ${customer} não existe`);
    }

    if (!(await SellerModel.findById(seller))) {
      throw new ApiError(400, `Vendedor de id ${seller} não existe`);
    }

    for (const item of items) {
      if (!(await ProductModel.findById(item.product))) {
        throw new ApiError(400, `Produto de id ${item.product} não existe`);
      }
    }

    const uniqueItems = new Set(items.map(item => item.product));

    if (uniqueItems.size < items.length) {
      throw new ApiError(400, `Existem itens duplicados.`);
    }
  }
}

export default new OrderService();
