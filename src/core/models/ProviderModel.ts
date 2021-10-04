import { IDbProvider } from '../interfaces/IProvider';
import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  ditrict: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  CEP: {
    type: String,
    required: true,
  },
  type: { /* tipo de pessoa (F)isica ou (J)uridica */
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProviderSchema.plugin(mongoosePagination);

const ProviderModel =
  (mongoose.models.Provider as Pagination<IDbProvider>) ||
  mongoose.model<IDbProvider, Pagination<IDbProvider>>('Provider', ProviderSchema);

export default ProviderModel;
