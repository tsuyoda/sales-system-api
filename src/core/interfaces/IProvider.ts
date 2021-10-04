import { Document } from 'mongoose';

export interface IProviderData {
  name: string;
  type: string;
}

export interface IProviderParams {
  name?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IProviderSearchFields {
  name?: {
    $regex: RegExp;
  };
}

export interface IDbProvider extends Document {
  name: string;
  type: string;
  createdAt: Date;
}
