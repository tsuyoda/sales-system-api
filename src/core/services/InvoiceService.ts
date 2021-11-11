import ApiError from '../exceptions/ApiError';
import { PaginationModel } from 'mongoose-paginate-ts';
import {
  IDbInvoice,
  IInvoiceData,
  IInvoiceItem,
  IInvoiceSearchFields,
} from '../interfaces/IInvoice';
import CustomerModel from '../models/CustomerModel';
import OrderModel from '../models/OrderModel';
import ProductService from './ProductService';
import InvoiceModel from './../models/InvoiceModel';
import { IInvoiceParams } from './../interfaces/IInvoice';

class InvoiceService {
  async create(data: IInvoiceData): Promise<IDbInvoice> {
    const { customer: customerId, order: orderId, items } = data;

    await this.invoiceDataValidation(customerId, orderId, items);

    return InvoiceModel.create(data);
  }

  async list(data: IInvoiceParams): Promise<PaginationModel<IDbInvoice>> {
    const { page, limit, sort, orderCod, ...rest } = data;

    const payload: IInvoiceSearchFields = { ...rest } as IInvoiceSearchFields;

    if (orderCod) {
      const order = await OrderModel.findOne({ cod: orderCod });

      if (!order) {
        return {} as PaginationModel<IDbInvoice>;
      }

      payload.order = order._id;
    }

    const options = {
      query: payload,
      populate: ['customer', 'order'],
      sort: { createdAt: sort },
      page,
      limit,
    };

    const results = await InvoiceModel.paginate(options);

    if (!results) {
      return {} as PaginationModel<IDbInvoice>;
    }

    return results;
  }

  async show(id: string): Promise<IDbInvoice> {
    const order = await InvoiceModel.findById(id).populate(['customer', 'order']);

    if (!order) {
      throw new ApiError(404, 'invoice not found');
    }

    return order;
  }

  private async invoiceDataValidation(
    customerId: string,
    orderId: string,
    items: IInvoiceItem[],
    id = ''
  ) {
    const customer = await CustomerModel.findById(customerId);
    const order = await OrderModel.findById(orderId);

    if (!order) {
      throw new ApiError(400, `Pedido de id ${orderId} não existe`);
    }

    if (order.status !== 'processed') {
      throw new ApiError(
        400,
        `Pedido de id ${orderId} possui um status inválido para a geração de nota fiscal. É necessário que o pedido esteja processado`
      );
    }

    if (!customer) {
      throw new ApiError(400, `Cliente de id ${customerId} não existe`);
    }

    for (const item of items) {
      const product = await ProductService.show(item.product);

      if (!product) {
        throw new ApiError(400, `Produto de id ${item.product} não existe`);
      }
    }

    const uniqueItems = new Set(items.map(item => item.product));

    if (uniqueItems.size < items.length) {
      throw new ApiError(400, `Existem itens duplicados.`);
    }

    const findByOrder = await InvoiceModel.findOne({ order: orderId });

    if (findByOrder && (id ? findByOrder._id.toString() !== id : true)) {
      throw new ApiError(400, `Pedido "${orderId}" já está vinculado a outra nota fiscal`);
    }
  }
}

export default new InvoiceService();
