import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { IDbOrder } from './../interfaces/IOrder';

const OrderValuesDocumentSchema = {
  totalItems: {
    type: Number,
    required: true,
  },
  totalDiscount: {
    type: Number,
    default: 0.0,
  },
  paid: {
    type: Number,
    default: 0.0,
  },
  total: {
    type: Number,
    required: true,
  },
};

const OrderDatesDocumentSchema = {
  creation: {
    type: Date,
    required: true,
  },
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
  date: OrderDatesDocumentSchema,
  status: {
    type: String,
    default: 'new',
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
  costumer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Costumer',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.plugin(mongoosePagination);

const SellerModel =
  (mongoose.models.Order as Pagination<IDbOrder>) ||
  mongoose.model<IDbOrder, Pagination<IDbOrder>>('Order', OrderSchema);

export default SellerModel;
