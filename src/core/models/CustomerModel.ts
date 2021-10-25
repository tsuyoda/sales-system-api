import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import PersonSchema from './sharedSchemas/PersonSchema';
import { IDbCustomer } from '../interfaces/ICustomer';

const CustomerSchema = new mongoose.Schema<IDbCustomer>({
  ...PersonSchema,
  participatePointsProgram: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CustomerSchema.plugin(mongoosePagination);

const CustomerModel =
  (mongoose.models.Customer as Pagination<IDbCustomer>) ||
  mongoose.model<IDbCustomer, Pagination<IDbCustomer>>('Customer', CustomerSchema);

export default CustomerModel;
