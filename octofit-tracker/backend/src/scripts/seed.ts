import mongoose from 'mongoose';
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from '../models';
import { connectToDatabase } from '../config/database';

// Seed the octofit_db database with test data
const seedDatabase = async () => {
  await connectToDatabase();
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Ava Chen',
      email: 'ava@example.com',
      role: 'captain',
    },
    {
      name: 'Marcus Lee',
      email: 'marcus@example.com',
      role: 'member',
    },
    {
      name: 'Nia Patel',
      email: 'nia@example.com',
      role: 'member',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Storm Squad',
      members: users.map((user) => user.name),
      goal: 'Complete 10 weekly workouts',
    },
    {
      name: 'River Runners',
      members: ['Mina', 'Theo'],
      goal: 'Improve endurance',
    },
  ]);

  const activities = await Activity.insertMany([
    {
      type: 'run',
      duration: 35,
      date: '2026-06-25',
    },
    {
      type: 'strength',
      duration: 45,
      date: '2026-06-26',
    },
  ]);

  const leaderboard = await LeaderboardEntry.insertMany([
    {
      name: users[0].name,
      points: 240,
      streak: 7,
    },
    {
      name: users[1].name,
      points: 190,
      streak: 3,
    },
    {
      name: users[2].name,
      points: 210,
      streak: 5,
    },
  ]);

  const workouts = await Workout.insertMany([
    {
      title: 'HIIT Cardio Burst',
      difficulty: 'intermediate',
      duration: 25,
    },
    {
      title: 'Core & Mobility Flow',
      difficulty: 'beginner',
      duration: 20,
    },
  ]);

  console.log('Seeded users:', users.length);
  console.log('Seeded teams:', teams.length);
  console.log('Seeded activities:', activities.length);
  console.log('Seeded leaderboard entries:', leaderboard.length);
  console.log('Seeded workouts:', workouts.length);

  await mongoose.disconnect();
};

seedDatabase().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
