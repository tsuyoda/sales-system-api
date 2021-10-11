import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import mongoose from '../support/database/mongo';
import { IDbInvoice } from './../interfaces/IInvoice';

const InvoiceValuesDocSchema = {
  totalItems: {
    type: Number,
    required: true,
  },
  totalDiscount: {
    type: Number,
    required: true,
  },
  freight: {
    type: Number,
    required: true,
  },
  baseICMS: {
    type: Number,
    required: true,
  },
  totalICMS: {
    type: Number,
    required: true,
  },
  incidentalExpenses: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
};

const InvoiceSchema = new mongoose.Schema<IDbInvoice>({
  series: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  extraDetails: {
    type: String,
    required: false,
  },
  paymentType: {
    type: String,
    required: true,
  },
  UF: {
    type: String,
    required: true,
  },
  value: InvoiceValuesDocSchema,
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
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

InvoiceSchema.plugin(mongoosePagination);

const InvoiceModel =
  (mongoose.models.Invoice as Pagination<IDbInvoice>) ||
  mongoose.model<IDbInvoice, Pagination<IDbInvoice>>('Invoice', InvoiceSchema);

export default InvoiceModel;
