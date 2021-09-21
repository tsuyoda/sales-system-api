import express from 'express';
import { Schema } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string | Schema.Types.ObjectId;
        name: string;
      };
    }
  }
}
