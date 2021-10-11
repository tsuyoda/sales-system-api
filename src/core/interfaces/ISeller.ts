import { Document, Types } from 'mongoose';
import { IDbUser } from './IUser';

export interface IDbSeller extends Document {
  commision: number;
  maxDiscount: number;
  user: Types.ObjectId | string | IDbUser;
  createdAt: Date;
}
