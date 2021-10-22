import { IDbRole } from '../interfaces/IRole';
import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

const PermissionSchema = {
  _id: false,
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true,
  },
  actions: [
    {
      type: String,
      required: true,
    },
  ],
};

const RoleSchema = new mongoose.Schema<IDbRole>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  permissions: [PermissionSchema],
  isAdmin: {
    type: Boolean,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

RoleSchema.plugin(mongoosePagination);

const RoleModel =
  (mongoose.models.Role as Pagination<IDbRole>) ||
  mongoose.model<IDbRole, Pagination<IDbRole>>('Role', RoleSchema);

export default RoleModel;
