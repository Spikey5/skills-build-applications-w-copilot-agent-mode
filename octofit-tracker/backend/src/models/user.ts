import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, default: 'demo-password-hash' },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    age: { type: Number, min: 18 },
    location: { type: String, default: 'Remote' },
    goals: [{ type: String }],
    bio: { type: String, default: '' },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
