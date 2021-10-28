import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { IDbSeller } from './../interfaces/ISeller';

const SellerSchema = new mongoose.Schema<IDbSeller>({
  comission: {
    type: Number,
    required: true,
  },
  maxDiscount: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

SellerSchema.plugin(mongoosePagination);

const SellerModel =
  (mongoose.models.Seller as Pagination<IDbSeller>) ||
  mongoose.model<IDbSeller, Pagination<IDbSeller>>('Seller', SellerSchema);

export default SellerModel;
