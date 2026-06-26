import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: 'member' },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: String }],
  goal: { type: String, default: 'Stay active' },
});

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true },
  duration: { type: Number, default: 30 },
  date: { type: String, default: new Date().toISOString() },
});

const leaderboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
});

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, default: 'beginner' },
  duration: { type: Number, default: 20 },
});

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
