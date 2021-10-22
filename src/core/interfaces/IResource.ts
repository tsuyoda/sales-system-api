import { Document } from 'mongoose';

export interface IResourceData {
  name: string;
  description?: string;
  availableActions: string[];
}

export interface IResourceParams {
  name?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IResourceSearchFields {
  name?: string;
}

export interface IDbResource extends Document {
  name: string;
  description?: string;
  availableActions: string[];
  createdAt: Date;
}
