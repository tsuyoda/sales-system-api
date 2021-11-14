import { Schema, Document } from 'mongoose';
import { IDbCustomer } from './ICustomer';
import { IDbBenefit } from './IBenefit';

export interface IScoreData {
  points: number;
  customer: string;
  scoreLevel?: string;
}

export interface IScoreLevelData {
  name: string;
  pointsThreshold: number;
  benefits: string[];
}

export interface IScoreParams {
  customer?: string;
  scoreLevel?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IScoreLevelParams {
  name?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IScoreLevelSearchFields {
  name?: {
    $regex: RegExp;
  };
}

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
