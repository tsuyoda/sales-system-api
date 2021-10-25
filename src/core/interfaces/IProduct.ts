import { Document, Types } from 'mongoose';
import { IDbProvider } from './IProvider';

export interface IProductData {
  sku: string;
  title: string;
  description?: string;
  value: number;
  quantity: number;
  measurementUnit: IProductMeasurementUnit;
  length: number;
  width: number;
  height: number;
  weight: number;
  provider: string;
}

export interface IProductParams {
  title?: string;
  provider?: string;
  sku?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IProductSearchFields {
  provider?: string;
  sku?: string;
  title?: {
    $regex: RegExp;
  };
}

interface IProductMeasurementUnit {
  type: string;
  value: number;
}

export interface IDbProduct extends Document {
  sku: string;
  title: string;
  description?: string;
  value: number;
  quantity: number;
  measurementUnit: IProductMeasurementUnit;
  length: number;
  width: number;
  height: number;
  weight: number;
  provider: string | Types.ObjectId | IDbProvider;
  createdAt: Date;
}

export interface IDbProductPrice extends Document {
  value: number;
  product: string | Types.ObjectId | IDbProduct;
  createdAt: Date;
}
