import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import PersonSchema from './sharedSchemas/PersonSchema';
import { IDbCostumer } from './../interfaces/ICostumer';

const CostumerSchema = new mongoose.Schema<IDbCostumer>({
  ...PersonSchema.obj,
  participatePointsProgram: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CostumerSchema.plugin(mongoosePagination);

const CostumerModel =
  (mongoose.models.Costumer as Pagination<IDbCostumer>) ||
  mongoose.model<IDbCostumer, Pagination<IDbCostumer>>('Costumer', CostumerSchema);

export default CostumerModel;
