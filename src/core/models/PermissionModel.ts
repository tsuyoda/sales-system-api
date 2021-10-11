import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { IDbPermission } from '../interfaces/IPermission';

const PermissionSchema = new mongoose.Schema<IDbPermission>({
  resource: {
    resource: String,
    required: true,
  },
  action: {
    resource: String,
    required: true,
  },
  possession: {
    resource: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PermissionSchema.plugin(mongoosePagination);

const PermissionModel =
  (mongoose.models.Permission as Pagination<IDbPermission>) ||
  mongoose.model<IDbPermission, Pagination<IDbPermission>>('Permission', PermissionSchema);

export default PermissionModel;
