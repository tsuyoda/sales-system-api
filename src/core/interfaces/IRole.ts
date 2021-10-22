import { Document, Schema } from 'mongoose';
import { IDbResource } from './IResource';

interface IPermissionData {
  resource: string | Schema.Types.ObjectId;
  actions: string[];
}
export interface IRoleData {
  name: string;
  description?: string;
  permissions: IPermissionData[];
  isAdmin?: boolean;
}

export interface IRoleParams {
  isAdmin?: boolean;
  name?: string | string[];
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IRoleSearchFields {
  isAdmin?: boolean;
  name?: {
    $in: RegExp[];
  };
}

export interface IPermission {
  resource: Schema.Types.ObjectId | IDbResource | string;
  actions: string[];
}

export interface IDbRole extends Document {
  name: string;
  description?: string;
  permissions: IPermission[];
  isAdmin?: boolean;
  createdAt: Date;
}
