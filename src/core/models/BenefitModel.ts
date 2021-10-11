import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { IDbBenifit } from './../interfaces/IBenifit';

const BenifitSchema = new mongoose.Schema<IDbBenifit>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ['purchase_discount', 'shipping_discount'],
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

BenifitSchema.plugin(mongoosePagination);

const BenefitModel =
  (mongoose.models.Benifit as Pagination<IDbBenifit>) ||
  mongoose.model<IDbBenifit, Pagination<IDbBenifit>>('Benifit', BenifitSchema);

export default BenefitModel;
