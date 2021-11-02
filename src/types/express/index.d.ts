import express from 'express';
import { Types } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: Types.ObjectId;
        name: string;
        roleId: Schema.Types.ObjectId;
        isAdmin: boolean;
      };
    }
  }
}
