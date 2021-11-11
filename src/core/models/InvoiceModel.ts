import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import mongoose from '../support/database/mongo';
import { IDbInvoice } from './../interfaces/IInvoice';
import { ItemsValuesDocumentSchema } from './sharedSchemas/ItemsSchema';

const InvoiceItemSchema = {
  title: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
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

const InvoiceValuesSchema = {
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
  total: {
    type: Number,
    required: true,
  },
};

const AddressSchema = {
  street: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  complement: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
};

const ContactSchema = {
  tel: {
    type: String,
    required: true,
  },
};

const RecipientSchema = {
  name: {
    type: String,
    required: true,
  },
  cpfCnpj: {
    type: String,
    required: true,
  },
  address: AddressSchema,
  contact: ContactSchema,
};

const InvoiceSchema = new mongoose.Schema<IDbInvoice>({
  recipient: RecipientSchema,
  paymentType: {
    type: String,
    required: true,
  },
  value: InvoiceValuesSchema,
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  items: [InvoiceItemSchema],
  dispatchedAt: {
    type: Date,
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
