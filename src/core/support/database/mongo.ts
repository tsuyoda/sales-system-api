import { DB_HOST, DB_NAME, DB_PORT } from '../../../config/database';

import mongoose from 'mongoose';

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

export default mongoose;
