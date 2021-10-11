import { IDbProduct } from '../interfaces/IProduct';
import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

const MeasurementUnitDocSchema = {
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
};

const ProductSchema = new mongoose.Schema<IDbProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  value: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  measurementUnit: MeasurementUnitDocSchema,
  length: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
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
