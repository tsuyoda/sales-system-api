import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { IDbOrderItem } from '../interfaces/IOrder';
import mongoose from '../support/database/mongo';
import { ItemsValuesDocumentSchema } from './sharedSchemas/ItemsSchema';

const OrderItemSchema = new mongoose.Schema<IDbOrderItem>({
  quantity: {
    type: Number,
    required: true,
  },
  value: ItemsValuesDocumentSchema,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

OrderItemSchema.plugin(mongoosePagination);

const OrderItemModel =
  (mongoose.models.OrderItem as Pagination<IDbOrderItem>) ||
  mongoose.model<IDbOrderItem, Pagination<IDbOrderItem>>('OrderItem', OrderItemSchema);

export default OrderItemModel;
