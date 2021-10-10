import { Document } from 'mongoose';

export interface IRoleData {
  name: string;
  description?: string;
}

export interface IRoleParams {
  name?: string | string[];
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IRoleSearchFields {
  name?: {
    $in: RegExp[];
  };
}

export interface IDbRole extends Document {
  name: string;
  description?: string;
  createdAt: Date;
}
