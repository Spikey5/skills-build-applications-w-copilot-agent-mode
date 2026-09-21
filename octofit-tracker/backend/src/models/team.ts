import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    members: { type: Number, default: 0 },
    goal: { type: String, default: '' },
    sport: { type: String, default: 'fitness' },
    captainId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
);

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);

export default Team;
