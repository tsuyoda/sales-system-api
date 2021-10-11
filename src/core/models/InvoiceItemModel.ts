import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { IDbInvoiceItem } from '../interfaces/IInvoice';
import mongoose from '../support/database/mongo';
import { ItemsValuesDocumentSchema } from './sharedSchemas/ItemsSchema';

const InvoiceItemSchema = new mongoose.Schema<IDbInvoiceItem>({
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
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

InvoiceItemSchema.plugin(mongoosePagination);

const InvoiceItemModel =
  (mongoose.models.InvoiceItem as Pagination<IDbInvoiceItem>) ||
  mongoose.model<IDbInvoiceItem, Pagination<IDbInvoiceItem>>('InvoiceItem', InvoiceItemSchema);

export default InvoiceItemModel;
