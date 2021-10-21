import { Schema, Document } from 'mongoose';
import { IDbPermission } from './IPermission';
import { IDbCustomer } from './ICustomer';

export interface IDbScoreLevel extends Document {
  name: string;
  pointsThreshold: number;
  benefits: string[] | Schema.Types.ObjectId[] | IDbPermission[];
  createdAt: Date;
}

export interface IDbScore extends Document {
  points: number;
  customer: string | Schema.Types.ObjectId | IDbCustomer;
  scoreLevel: string | Schema.Types.ObjectId | IDbScoreLevel;
  createdAt: Date;
}
