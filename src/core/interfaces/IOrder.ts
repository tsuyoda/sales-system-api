import { Document, Types } from 'mongoose';
import { IDbSeller } from './ISeller';
import { IDbCustomer } from './ICustomer';
import { IDbProduct } from './IProduct';

interface IOrderValue {
  totalItems: number;
  totalDiscount: number;
  paid: number;
  total: number;
}

interface IOrderDate {
  creation: Date;
  delivery: Date;
  payment: Date;
}

export interface IDbOrder extends Document {
  value: IOrderValue;
  date: IOrderDate;
  status: string;
  seller: Types.ObjectId | string | IDbSeller;
  customer: Types.ObjectId | string | IDbCustomer;
  createdAt: Date;
}

export interface IDbOrderItem extends Document {
  quantity: number;
  value: {
    unitary: number;
    subtotal: number;
  };
  product: Types.ObjectId | string | IDbProduct;
  order: Types.ObjectId | string | IDbOrder;
}
