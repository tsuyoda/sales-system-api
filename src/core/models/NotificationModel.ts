import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { IDbNotification } from '../interfaces/INotification';

const NotificationSchema = new mongoose.Schema<IDbNotification>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  viewed: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  redirect: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

NotificationSchema.plugin(mongoosePagination);

const NotificationModel =
  (mongoose.models.Notification as Pagination<IDbNotification>) ||
  mongoose.model<IDbNotification, Pagination<IDbNotification>>('Notification', NotificationSchema);

export default NotificationModel;
