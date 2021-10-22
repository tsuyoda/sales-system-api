import express from 'express';
import { Schema } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: Schema.Types.ObjectId;
        name: string;
        roleId: Schema.Types.ObjectId;
        isAdmin: boolean;
      };
    }
  }
}
