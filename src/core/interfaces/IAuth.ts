import { Schema } from 'mongoose';

export interface IAuth {
  token: string;
  expiresAt: Date;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
  role: {
    id: string;
    name: string;
    description?: string;
  };
}

export interface IAuthData {
  username: string;
  password: string;
}

export interface IDecodedJWT {
  id: Schema.Types.ObjectId;
  name: string;
  roleId: Schema.Types.ObjectId;
  isAdmin: boolean;
}
