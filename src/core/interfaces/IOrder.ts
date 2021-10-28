import { Document, Types } from 'mongoose';
import { IDbSeller } from './ISeller';
import { IDbCustomer } from './ICustomer';

export interface IOrderItemData {
  quantity: number;
  value: {
    unitary: number;
    subtotal: number;
  };
  product: string;
}

export interface IOrderData {
  value: IOrderValue;
  discountPercentage: number;
  date: IOrderDate;
  status: string;
  seller: string;
  customer: string;
  items: IOrderItemData[];
}

export interface IOrderParams {
  cod?: number;
  seller?: string;
  customer?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IOrderSearchFields {
  cod?: number;
  seller?: string;
  customer?: string;
}

interface IOrderValue {
  totalItems: number;
  totalDiscount: number;
  total: number;
}

interface IOrderDate {
  delivery: Date;
  payment: Date;
}

export interface IDbOrder extends Document {
  value: IOrderValue;
  discountPercentage: number;
  paymentType: string;
  date: IOrderDate;
  status: string;
  seller: Types.ObjectId | string | IDbSeller;
  customer: Types.ObjectId | string | IDbCustomer;
  items: IOrderItemData[];
  createdAt: Date;
}
