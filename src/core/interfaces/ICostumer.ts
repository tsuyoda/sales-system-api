import { Document } from 'mongoose';
import { IDbUser } from './IUser';

export interface IDbCostumer extends Document, IDbUser {
  participatePointsProgram: boolean;
  createdAt: Date;
}
