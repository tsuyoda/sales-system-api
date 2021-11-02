import { Types } from 'mongoose';

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
  id: Types.ObjectId;
  name: string;
  roleId: Types.ObjectId;
  isAdmin: boolean;
}
