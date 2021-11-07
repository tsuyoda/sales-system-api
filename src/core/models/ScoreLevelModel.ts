import mongoose from '../support/database/mongo';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { IDbScoreLevel } from '../interfaces/IScore';

const ScoreLevelSchema = new mongoose.Schema<IDbScoreLevel>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  pointsThreshold: {
    type: Number,
    required: true,
  },
  benefits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Benefit',
      required: false,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ScoreLevelSchema.plugin(mongoosePagination);

const ScoreLevelModel =
  (mongoose.models.ScoreLevel as Pagination<IDbScoreLevel>) ||
  mongoose.model<IDbScoreLevel, Pagination<IDbScoreLevel>>('ScoreLevel', ScoreLevelSchema);

export default ScoreLevelModel;
