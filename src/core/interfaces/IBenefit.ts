import { Document } from 'mongoose';

export interface IBenefitData {
  name: string;
  description?: string;
  type: 'purchase_discount' | 'shipping_discount';
  value: number;
}

export interface IBenefitParams {
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IDbBenefit extends Document {
  name: string;
  description?: string;
  type: 'purchase_discount' | 'shipping_discount';
  value: number;
  createdAt: Date;
}
