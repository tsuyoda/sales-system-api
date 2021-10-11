import { Document } from 'mongoose';

export interface IDbBenifit extends Document {
  name: string;
  description?: string;
  type: 'purchase_discount' | 'shipping_discount';
  value: number;
  createdAt: Date;
}
