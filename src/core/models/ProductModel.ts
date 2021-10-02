import { IDbProduct } from '../interfaces/IProduct';
import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.plugin(mongoosePagination);

const ProductModel =
  (mongoose.models.Product as Pagination<IDbProduct>) ||
  mongoose.model<IDbProduct, Pagination<IDbProduct>>('Product', ProductSchema);

export default ProductModel;
