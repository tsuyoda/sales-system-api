import { Document, Schema } from 'mongoose';
import { IDbPermission } from './IPermission';

export interface IRoleData {
  name: string;
  description?: string;
  isAdmin?: boolean;
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
  permissions: string[] | Schema.Types.ObjectId[] | IDbPermission[];
  isAdmin?: boolean;
  createdAt: Date;
}
