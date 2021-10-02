import { Document } from 'mongoose';

export interface IProductData {
  title: string;
  description: string;
  value: number;
  amount: number;
}

export interface IProductParams {
  title?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IProductSearchFields {
  title?: {
    $regex: RegExp;
  };
}

export interface IDbProduct extends Document {
  title: string;
  description: string;
  value: number;
  amount: number;
  createdAt: string;
}
