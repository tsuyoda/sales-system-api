import { Document, Types } from 'mongoose';
import { IDbSeller } from './ISeller';
import { IDbCustomer } from './ICustomer';
import { IDbProduct } from './IProduct';

export type OrderStatus = 'new' | 'pending' | 'processed' | 'canceled';
export type OrderManagementStatus = 'pending' | 'approved' | 'reproved';

export interface IOrderValidation {
  customer: IDbCustomer;
  seller: IDbSeller;
  products: IDbProduct[];
}

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
  seller: string;
  customer: string;
  appliedBenefits?: string[];
  items: IOrderItemData[];
}

export interface IOrderManagementData {
  order: string;
}

export interface IOrderParams {
  cod?: number;
  seller?: string;
  customer?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IOrderManagementParams {
  order?: string;
  status?: string;
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
  delivery: number;
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
  status: OrderStatus;
  seller: Types.ObjectId | string | IDbSeller;
  customer: Types.ObjectId | string | IDbCustomer;
  items: IOrderItemData[];
  createdAt: Date;
}

export interface IDbOrderManagement extends Document {
  status: OrderManagementStatus;
  order: Types.ObjectId | string | IDbSeller;
  createdAt: Date;
}
