import { Document } from 'mongoose';
import { IDbUser } from './IUser';
import { IPerson } from './IPerson';

export interface ICustomerData extends IPerson {
  participatePointsProgram: boolean;
}

export interface ICustomerParams {
  fullName?: string;
  email?: string;
  doc?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface ICustomerSearchFields {
  fullName?: {
    $regex: RegExp;
  };
  'doc.id'?: string;
  email?: string;
}

export interface IDbCustomer extends Document, IDbUser {
  participatePointsProgram: boolean;
  createdAt: Date;
}
