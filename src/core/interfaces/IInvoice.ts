import { Document, Types } from 'mongoose';
import { IDbOrder } from './IOrder';
import { IDbCostumer } from './ICostumer';
import { IDbProduct } from './IProduct';

interface IInvoiceValue {
  totalItems: number;
  totalDiscount: number;
  freight: number;
  baseICMS: number;
  totalICMS: number;
  incidentalExpenses: number;
  total: number;
}

export interface IDbInvoice extends Document {
  series: string;
  description?: string;
  extraDetails?: string;
  paymentType: string;
  UF: string;
  value: IInvoiceValue;
  order: string | Types.ObjectId | IDbOrder;
  costumer: string | Types.ObjectId | IDbCostumer;
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
