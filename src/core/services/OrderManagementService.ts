import ApiError from '../exceptions/ApiError';
import { PaginationModel } from 'mongoose-paginate-ts';
import {
  IOrderManagementData,
  IDbOrderManagement,
  IOrderManagementParams,
} from '../interfaces/IOrder';
import OrderManagementModel from '../models/OrderManagementModel';
import OrderModel from '../models/OrderModel';
import OrderService from './OrderService';

class OrderManagementService {
  async create(data: IOrderManagementData): Promise<IDbOrderManagement> {
    const { order: orderId } = data;

    const order = await OrderModel.findById(orderId);

    if (!order) {
      throw new ApiError(404, `order ${orderId} not found`);
    }

    const requestData = {
      status: 'pending',
      order: orderId,
    };

    return OrderManagementModel.create(requestData);
  }

  async moderate(id: string, status: 'approved' | 'reproved'): Promise<{ message: string }> {
    const request = await OrderManagementModel.findById(id);

    if (!request) {
      throw new ApiError(404, 'order management not found');
    }

    const order = await OrderService.show(request.order.toString());

    if (!order) {
      throw new ApiError(404, `failed to find order '${request.order.toString()}'`);
    }

    if (status === 'approved') {
      await OrderService.processOrder(order._id);

      return { message: 'Order accepted successfully!' };
    } else {
      await OrderService.cancelOrder(order._id);

      return { message: 'Order reproved successfully!' };
    }
  }

  async list(data: IOrderManagementParams): Promise<PaginationModel<IDbOrderManagement>> {
    const { page, limit, sort, ...params } = data;

    const options = {
      query: params,
      populate: 'order',
      sort: { createdAt: sort },
      page,
      limit,
    };

    const results = await OrderManagementModel.paginate(options);

    if (!results) {
      return {} as PaginationModel<IDbOrderManagement>;
    }

    return results;
  }

  async show(id: string): Promise<IDbOrderManagement> {
    const request = await OrderManagementModel.findById(id).populate('order');

    if (!request) {
      throw new ApiError(404, 'order management not found');
    }

    return request;
  }

  async delete(id: string): Promise<IDbOrderManagement> {
    const order = await OrderManagementModel.findByIdAndDelete(id);

    if (!order) {
      throw new ApiError(404, 'order management not found');
    }

    if (order.status === 'pending') {
      await this.moderate(id, 'reproved');
    }

    return order;
  }
}

export default new OrderManagementService();
