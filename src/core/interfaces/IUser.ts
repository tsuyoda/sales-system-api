import { Document, Schema } from 'mongoose';

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
  role: string | Schema.Types.ObjectId;
  createdAt: Date;
}
