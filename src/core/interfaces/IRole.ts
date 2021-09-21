import { Document } from 'mongoose';

export interface IRoleData {
  name: string;
  description?: string;
}

export interface IRoleParams {
  name?: string;
}

export interface IRoleSearchFields {
  name?: {
    $regex: RegExp;
  };
}

export interface IDbRole extends Document {
  name: string;
  description?: string;
  createdAt: Date;
}
