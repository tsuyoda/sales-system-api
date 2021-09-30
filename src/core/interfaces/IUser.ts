import { Document, Schema } from 'mongoose';
import { IDbRole } from './IRole';

export interface IUserData {
  name: string;
  fullName: string;
  email: string;
  password: string;
  role: string | Schema.Types.ObjectId;
}

export interface IUserParams {
  name?: string;
  fullName?: string;
  email?: string;
  role?: string | Schema.Types.ObjectId;
  page?: number;
  limit?: number;
}

export interface IUserSearchFields {
  name?: {
    $regex: RegExp;
  };
  fullName?: {
    $regex: RegExp;
  };
  email?: string;
  role?: string | Schema.Types.ObjectId;
}

export interface IDbUser extends Document {
  name: string;
  fullName: string;
  email: string;
  password: string;
  role: string | Schema.Types.ObjectId | IDbRole;
  createdAt: Date;
}
