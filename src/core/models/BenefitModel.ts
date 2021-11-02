import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { IDbBenefit } from '../interfaces/IBenefit';

const BenefitSchema = new mongoose.Schema<IDbBenefit>({
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

BenefitSchema.plugin(mongoosePagination);

const BenefitModel =
  (mongoose.models.Benifit as Pagination<IDbBenefit>) ||
  mongoose.model<IDbBenefit, Pagination<IDbBenefit>>('Benefit', BenefitSchema);

export default BenefitModel;
