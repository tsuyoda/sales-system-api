import { Schema, Document } from 'mongoose';
import { IDbBenifit } from './IBenifit';
import { IDbCostumer } from './ICostumer';

export interface IDbScoreLevel extends Document {
  name: string;
  pointsThreshold: number;
  benefits: string[] | Schema.Types.ObjectId[] | IDbBenifit[];
  createdAt: Date;
}

export interface IDbScore extends Document {
  points: number;
  costumer: string | Schema.Types.ObjectId | IDbCostumer;
  scoreLevel: string | Schema.Types.ObjectId | IDbScoreLevel;
  createdAt: Date;
}
