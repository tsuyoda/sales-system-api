import { Document, Types } from 'mongoose';
import { IDbUser } from './IUser';

export interface ISellerData {
  comission: number;
  maxDiscount: number;
  user: string;
}

export interface ISellerParams {
  user?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IDbSeller extends Document {
  commision: number;
  maxDiscount: number;
  user: Types.ObjectId | string | IDbUser;
  createdAt: Date;
}
