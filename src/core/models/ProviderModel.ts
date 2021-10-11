import { IDbProvider } from '../interfaces/IProvider';
import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import PersonSchema from './sharedSchemas/PersonSchema';

const ProviderSchema = new mongoose.Schema<IDbProvider>({
  ...PersonSchema.obj,
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
