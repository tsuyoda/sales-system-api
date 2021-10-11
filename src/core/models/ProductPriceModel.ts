import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import mongoose from '../support/database/mongo';
import { IDbProductPrice } from './../interfaces/IProduct';

const ProductPriceSchema = new mongoose.Schema<IDbProductPrice>({
  value: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProductPriceSchema.plugin(mongoosePagination);

const ProductPriceModel =
  (mongoose.models.ProductPrice as Pagination<IDbProductPrice>) ||
  mongoose.model<IDbProductPrice, Pagination<IDbProductPrice>>('ProductPrice', ProductPriceSchema);

export default ProductPriceModel;
