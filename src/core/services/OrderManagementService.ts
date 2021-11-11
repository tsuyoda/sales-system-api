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
import { IOrderManagementSearchFields } from './../interfaces/IOrder';
import NotificationService from './NotificationService';

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

    const request = await OrderManagementModel.create(requestData);

    NotificationService.createToAllowedUser({
      title: 'Solicitação de Aprovação',
      description: `Pedido ${order.cod}`,
      type: 'order_request',
      user: 'empty',
      redirect: '/order/request',
    });

    return request;
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
      await OrderManagementModel.findByIdAndUpdate(id, { status: 'approved' });

      return { message: 'Order accepted successfully!' };
    } else {
      await OrderService.cancelOrder(order._id);
      await OrderManagementModel.findByIdAndUpdate(id, { status: 'reproved' });

      return { message: 'Order reproved successfully!' };
    }
  }

  async list(data: IOrderManagementParams): Promise<PaginationModel<IDbOrderManagement>> {
    const { page, order, orderCod, seller, limit, sort, ...rest } = data;

    const payload: IOrderManagementSearchFields = { ...rest };

    if (orderCod) {
      const orders = await OrderModel.find({ cod: orderCod });

      payload.order = { $in: orders.map(o => o._id.toString()) };
    }

    if (seller) {
      const orders = await OrderModel.find({ seller });

      payload.order = { $in: orders.map(o => o._id.toString()) };
    }

    if (order) {
      payload.order = { $in: [order] };
    }

    const options = {
      query: payload,
      populate: [
        'order',
        {
          path: 'order',
          populate: [
            { path: 'seller', populate: 'user' },
            { path: 'customer', populate: 'user' },
          ],
        },
      ],
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
