import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { IDbOrder } from './../interfaces/IOrder';
import AutoIncrementFactory from 'mongoose-sequence';
import { ItemsValuesDocumentSchema } from './sharedSchemas/ItemsSchema';

const OrderItemSchema = {
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
};

const OrderValuesDocumentSchema = {
  totalItems: {
    type: Number,
    required: true,
  },
  totalDiscount: {
    type: Number,
    default: 0.0,
  },
  delivery: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
};

const OrderDatesDocumentSchema = {
  delivery: {
    type: Date,
    required: true,
  },
  payment: {
    type: Date,
    required: true,
  },
};

const OrderSchema = new mongoose.Schema<IDbOrder>({
  value: OrderValuesDocumentSchema,
  discountPercentage: {
    type: Number,
    default: 0.0,
  },
  paymentType: {
    type: String,
    required: true,
  },
  date: OrderDatesDocumentSchema,
  status: {
    type: String,
    enum: ['new', 'pending', 'processed', 'canceled'],
    default: 'new',
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  items: [OrderItemSchema],
  issuedInvoice: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

OrderSchema.plugin(mongoosePagination);
OrderSchema.plugin(AutoIncrement, { inc_field: 'cod' });

const OrderModel =
  (mongoose.models.Order as Pagination<IDbOrder>) ||
  mongoose.model<IDbOrder, Pagination<IDbOrder>>('Order', OrderSchema);

export default OrderModel;
