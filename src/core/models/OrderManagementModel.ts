import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { IDbOrderManagement } from '../interfaces/IOrder';

const OrderManagementSchema = new mongoose.Schema<IDbOrderManagement>({
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'reproved'],
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

OrderManagementSchema.plugin(mongoosePagination);

const OrderManagementModel =
  (mongoose.models.OrderManagement as Pagination<IDbOrderManagement>) ||
  mongoose.model<IDbOrderManagement, Pagination<IDbOrderManagement>>(
    'OrderManagement',
    OrderManagementSchema
  );

export default OrderManagementModel;
