import { Document } from 'mongoose';
import { IPerson } from './IPerson';

export interface IProviderData extends IPerson {}

export interface IProviderParams {
  fullName?: string;
  email?: string;
  doc?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IProviderSearchFields {
  fullName?: {
    $regex: RegExp;
  };
  'doc.id'?: string;
  email?: string;
}

export interface IDbProvider extends Document, IPerson {
  createdAt: Date;
}
