import { Document, Schema } from 'mongoose';
import mongoose from '../support/database/mongo';
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
  role?: {
    name?: string | string[];
  };
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IUserSearchFields {
  name?: {
    $regex: RegExp;
  };
  fullName?: {
    $regex: RegExp;
  };
  email?: string;
  role?: { $in: mongoose.Types.ObjectId[] };
}

export interface IDbUser extends Document {
  name: string;
  fullName: string;
  email: string;
  password: string;
  role: string | Schema.Types.ObjectId | IDbRole;
  createdAt: Date;
}
