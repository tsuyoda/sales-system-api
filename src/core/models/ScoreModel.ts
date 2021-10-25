import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { IDbScore } from '../interfaces/IScore';

const ScoreSchema = new mongoose.Schema<IDbScore>({
  points: {
    type: Number,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  scoreLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ScoreLevel',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ScoreSchema.plugin(mongoosePagination);

const ScoreModel =
  (mongoose.models.Score as Pagination<IDbScore>) ||
  mongoose.model<IDbScore, Pagination<IDbScore>>('Score', ScoreSchema);

export default ScoreModel;
