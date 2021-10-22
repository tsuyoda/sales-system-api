import { Document } from 'mongoose';
import { IDbUser } from './IUser';
import { IPerson } from './IPerson';


export interface ICustomerData extends IPerson {
  name: string;
}

export interface ICustomerParams {
  name?: string;
  fullName?: string;
  email?: string;
  doc?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface ICustomerSearchFields {
  name?: {
    $regex: RegExp;
  };
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
