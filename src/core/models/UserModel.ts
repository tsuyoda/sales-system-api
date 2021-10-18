import mongoose from '../support/database/mongo';
import bcrypt from 'bcrypt';
import { IDbUser } from '../interfaces/IUser';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import PersonSchema from './sharedSchemas/PersonSchema';

const UserSchema = new mongoose.Schema<IDbUser>({
  ...PersonSchema,
  name: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  email: {
    unique: true,
    lowercase: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  const hashPassword = await bcrypt.hash(this.password, 10);

  this.password = hashPassword;

  next();
});

UserSchema.plugin(mongoosePagination);

const UserModel =
  (mongoose.models.User as Pagination<IDbUser>) ||
  mongoose.model<IDbUser, Pagination<IDbUser>>('User', UserSchema);

export default UserModel;
