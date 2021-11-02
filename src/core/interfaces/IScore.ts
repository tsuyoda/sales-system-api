import { Schema, Document } from 'mongoose';
import { IDbCustomer } from './ICustomer';
import { IDbBenefit } from './IBenefit';

export interface IDbScoreLevel extends Document {
  name: string;
  pointsThreshold: number;
  benefits: string[] | Schema.Types.ObjectId[] | IDbBenefit[];
  createdAt: Date;
}

export interface IDbScore extends Document {
  points: number;
  customer: string | Schema.Types.ObjectId | IDbCustomer;
  scoreLevel: string | Schema.Types.ObjectId | IDbScoreLevel;
  createdAt: Date;
}
