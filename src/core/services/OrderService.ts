import ApiError from '../exceptions/ApiError';
import { PaginationModel } from 'mongoose-paginate-ts';
import {
  IOrderData,
  IDbOrder,
  IOrderParams,
  IOrderSearchFields,
  IOrderValidation,
  IOrderItemData,
} from './../interfaces/IOrder';
import CustomerModel from './../models/CustomerModel';
import SellerModel from './../models/SellerModel';
import OrderModel from './../models/OrderModel';
import ProductService from './ProductService';
import CustomerService from './CustomerService';
import OrderManagementService from './OrderManagementService';
import { IDbCustomer } from '../interfaces/ICustomer';
import InvoiceService from './InvoiceService';
import { IDbInvoice, IInvoiceData } from '../interfaces/IInvoice';
import { IDbProduct } from '../interfaces/IProduct';

class OrderService {
  async generateInvoice(id: string): Promise<IDbInvoice> {
    const order = await OrderModel.findById(id).populate([
      'customer',
      { path: 'items', populate: 'product' },
    ]);

    if (!order) {
      throw new ApiError(404, 'order not found');
    }

    const customer = order.customer as IDbCustomer;

    if (order.issuedInvoice) {
      throw new ApiError(400, 'invoice already issued');
    }

    if (!customer) {
      throw new ApiError(400, 'failed to find customer');
    }

    const invoicePayload: IInvoiceData = {
      recipient: {
        name: customer.fullName,
        cpfCnpj: customer.doc.id,
        address: customer.address,
        contact: {
          tel: customer.contact.tel,
        },
      },
      paymentType: order.paymentType,
      value: {
        totalItems: order.value.totalItems,
        totalDiscount: order.value.totalDiscount,
        freight: order.value.delivery,
        total: order.value.total,
        baseICMS: order.value.totalItems + order.value.delivery,
        totalICMS: 0.0, // TODO ICMS
      },
      customer: customer._id,
      order: order._id,
      items: order.items.map(item => {
        const product = item.product as IDbProduct;

        return {
          title: product.title,
          sku: product.sku,
          quantity: item.quantity,
          value: item.value,
          product: product._id.toString(),
        };
      }),
      dispatchedAt: order.date.delivery,
    };

    const invoice = await InvoiceService.create(invoicePayload);
    await OrderModel.findByIdAndUpdate(id, { issuedInvoice: true });

    return invoice;
  }

  async createRequest(id: string): Promise<void> {
    const order = await OrderModel.findById(id);

    if (!order) {
      throw new ApiError(404, 'order not found');
    }

    await OrderManagementService.create({ order: id });
    await OrderModel.findByIdAndUpdate(id, { status: 'pending' });
  }

  async processOrder(id: string): Promise<void> {
    const order = await OrderModel.findById(id).populate('customer');

    if (!order) {
      throw new ApiError(404, 'order not found');
    }

    const customer = order.customer as IDbCustomer;

    if (customer.participatePointsProgram) {
      await CustomerService.addCustomerPoints(customer._id, Math.round(order.value.totalItems));
    }

    await OrderModel.findByIdAndUpdate(id, { status: 'processed' });
  }

  async cancelOrder(id: string): Promise<void> {
    const order = await OrderModel.findById(id);

    if (!order) {
      throw new ApiError(404, 'order not found');
    }

    const { items } = order;

    await this.resetProductsStock(items);

    await OrderModel.findByIdAndUpdate(id, { status: 'canceled' });
  }

  async create(data: IOrderData): Promise<IDbOrder> {
    const { customer: customerId, seller: sellerId, items } = data;

    const { seller } = await this.orderDataValidation(customerId, sellerId, items);

    const order = await OrderModel.create(data);

    await this.decreaseProductsStock(items);

    const { _id, discountPercentage } = order;

    if (discountPercentage > seller.maxDiscount) {
      await this.createRequest(_id);
      order.status = 'pending';
    } else {
      await this.processOrder(_id);
      order.status = 'processed';
    }

    return order;
  }

  async update(id: string, data: IOrderData): Promise<IDbOrder> {
    const actualOrder = await OrderModel.findById(id).populate('customer');

    if (!actualOrder) {
      throw new ApiError(404, 'order not found');
    }

    const { items: actualItems, value } = actualOrder;
    const actualCustomer = actualOrder.customer as IDbCustomer;
    await this.resetProductsStock(actualItems);

    if (actualCustomer.participatePointsProgram) {
      // reset customer points
      await CustomerService.addCustomerPoints(actualCustomer._id, -Math.round(value.totalItems));
    }

    const { customer: customerId, seller: sellerId, discountPercentage, items } = data;
    const { seller } = await this.orderDataValidation(customerId, sellerId, items);
    await this.decreaseProductsStock(items);

    let status: 'pending' | 'processed';

    if (discountPercentage > seller.maxDiscount) {
      await OrderManagementService.create({ order: id });
      status = 'pending';
    } else {
      this.processOrder(id);
      status = 'processed';
    }

    const order = await OrderModel.findByIdAndUpdate(id, { ...data, status }, { new: true });

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
    const order = await OrderModel.findById(id).populate([
      'customer',
      {
        path: 'seller',
        populate: 'user',
      },
      {
        path: 'items',
        populate: 'product',
      },
    ]);

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

  private async decreaseProductsStock(items: IOrderItemData[]): Promise<void> {
    for (const index in items) {
      const item = items[index];
      const productId = typeof item.product === 'string' ? item.product : item.product._id;

      try {
        await ProductService.decreaseStock(productId, item.quantity);
      } catch (err) {
        for (const rIndex in [...Array(index).keys()]) {
          const item = items[rIndex];

          await ProductService.increaseStock(productId, item.quantity);
        }

        throw err;
      }
    }
  }

  private async resetProductsStock(items: IOrderItemData[]): Promise<void> {
    for (const index in items) {
      const item = items[index];
      const productId = typeof item.product === 'string' ? item.product : item.product._id;
      await ProductService.increaseStock(productId, item.quantity);
    }
  }

  private async orderDataValidation(
    customerId: string,
    sellerId: string,
    items: IOrderItemData[]
  ): Promise<IOrderValidation> {
    const customer = await CustomerModel.findById(customerId);
    const seller = await SellerModel.findById(sellerId);

    if (!seller) {
      throw new ApiError(400, `Vendedor de id ${seller} n??o existe`);
    }

    if (!customer) {
      throw new ApiError(400, `Cliente de id ${customer} n??o existe`);
    }

    const productsPromises = items.map(async item => {
      const productId = typeof item.product === 'string' ? item.product : item.product._id;
      const product = await ProductService.show(productId);

      if (!product) {
        throw new ApiError(400, `Produto de id ${item.product} n??o existe`);
      }

      if (item.quantity > product.quantity) {
        throw new ApiError(
          400,
          `Estoque insuficiente para o produto '${product.title}'. Quantidade dispon??vel: ${product.quantity}`
        );
      }

      return product;
    });

    const products = await Promise.all(productsPromises);

    const uniqueItems = new Set(items.map(item => item.product));

    if (uniqueItems.size < items.length) {
      throw new ApiError(400, `Existem itens duplicados.`);
    }

    return {
      customer,
      seller,
      products,
    };
  }
}

export default new OrderService();
