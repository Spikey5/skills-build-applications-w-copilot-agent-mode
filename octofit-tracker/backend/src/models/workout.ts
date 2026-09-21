import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, default: 'general fitness' },
    equipment: [{ type: String }],
    instructions: [{ type: String }],
  },
  { timestamps: true },
);

const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export default Workout;
