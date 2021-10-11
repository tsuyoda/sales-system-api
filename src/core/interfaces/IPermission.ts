import { Document } from 'mongoose';

export interface IPermissionData {
  resource: string;
  action: string;
  possesion: string;
}

export interface IPermissionParams {
  resource?: string;
  action?: string;
  possesion?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IPermissionSearchFields {
  name?: {
    $regex: RegExp;
  };
}

export interface IDbPermission extends Document {
  resource: string;
  action: string;
  possesion: string;
  createdAt: Date;
}
