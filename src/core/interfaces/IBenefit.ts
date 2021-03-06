import { Document } from 'mongoose';

export interface IBenefitData {
  name: string;
  description?: string;
  type: 'purchase_discount' | 'shipping_discount';
  value: number;
}

export interface IBenefitParams {
  name?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IBenefitSearchFields {
  name?: {
    $regex: RegExp;
  };
}

export interface IDbBenefit extends Document {
  name: string;
  description?: string;
  type: 'purchase_discount' | 'shipping_discount';
  value: number;
  createdAt: Date;
}
