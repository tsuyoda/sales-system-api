import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { IDbResource } from '../interfaces/IResource';

const ResourceSchema = new mongoose.Schema<IDbResource>({
  name: {
    type: String,
    required: true,
  },
  translatedName: {
    type: String,
    required: true,
  },
  availableActions: [{ type: String, required: true }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ResourceSchema.plugin(mongoosePagination);

const ResourceModel =
  (mongoose.models.Permission as Pagination<IDbResource>) ||
  mongoose.model<IDbResource, Pagination<IDbResource>>('Resource', ResourceSchema);

export default ResourceModel;
