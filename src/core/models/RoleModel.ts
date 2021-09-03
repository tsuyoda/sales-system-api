import { IDbRole } from '../interfaces/IRole';
import mongoose from '../support/database/mongo';

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RoleModel = mongoose.model<IDbRole>('Role', RoleSchema);

export default RoleModel;
