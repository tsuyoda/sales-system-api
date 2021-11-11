import { Document, Types } from 'mongoose';
import { IDbOrder } from './IOrder';
import { IDbCustomer } from './ICustomer';
import { IDbProduct } from './IProduct';

interface IInvoiceRecipient {
  name: string;
  cpfCnpj: string;
  address: {
    street: string;
    number: number;
    complement?: string;
    city: string;
    state: string;
    postalCode: string;
  };
  contact: {
    tel: string;
  };
}

interface IInvoiceValue {
  totalItems: number;
  totalDiscount: number;
  freight: number;
  baseICMS: number;
  totalICMS: number;
  total: number;
}

export interface IInvoiceItem {
  title: string;
  sku: string;
  quantity: number;
  value: {
    unitary: number;
    subtotal: number;
  };
  product: string;
}
export interface IInvoiceData {
  recipient: IInvoiceRecipient;
  paymentType: string;
  value: IInvoiceValue;
  order: string;
  customer: string;
  items: IInvoiceItem[];
  dispatchedAt: Date;
}

export interface IInvoiceParams {
  orderCod?: number;
  customer?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IInvoiceSearchFields {
  order?: string;
  customer?: string;
}
export interface IDbInvoice extends Document {
  recipient: IInvoiceRecipient;
  paymentType: string;
  value: IInvoiceValue;
  order: string | Types.ObjectId | IDbOrder;
  customer: string | Types.ObjectId | IDbCustomer;
  items: IInvoiceItem[];
  dispatchedAt: Date;
  createdAt: Date;
}

export interface IDbInvoiceItem extends Document {
  quantity: number;
  value: {
    unitary: number;
    subtotal: number;
  };
  product: Types.ObjectId | string | IDbProduct;
  invoice: Types.ObjectId | string | IDbInvoice;
}
