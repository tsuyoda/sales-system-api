import { Document, Types } from 'mongoose';

export interface INotificationData {
  title: string;
  description: string;
  type: string;
  user: string;
  redirect?: string;
  viewed?: boolean;
}

export interface INotificationParams {
  user?: string;
  viewed?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IDbNotification extends Document {
  title: string;
  description: string;
  type: string;
  viewed: boolean;
  user: Types.ObjectId | string;
  redirect?: string;
  createdAt: Date;
}
