import { Document } from 'mongoose';
import { IPerson } from './IPerson';

export interface IProviderData extends IPerson {}

export interface IProviderParams {
  fullName?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IProviderSearchFields {
  fullName?: {
    $regex: RegExp;
  };
}

export interface IDbProvider extends Document, IPerson {
  createdAt: Date;
}
