import mongoose from 'mongoose';

import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ada Sterling',
        email: 'ada@example.com',
        passwordHash: 'hash-ada',
        fitnessLevel: 'advanced',
        age: 31,
        location: 'Seattle, WA',
        goals: ['Marathon training', 'Strength gains'],
        bio: 'Loves long distance runs and recovery mobility.',
      },
      {
        name: 'Leo Park',
        email: 'leo@example.com',
        passwordHash: 'hash-leo',
        fitnessLevel: 'intermediate',
        age: 28,
        location: 'Austin, TX',
        goals: ['HIIT consistency', 'Core stability'],
        bio: 'Enjoys fast workouts and team challenges.',
      },
      {
        name: 'Maya Chen',
        email: 'maya@example.com',
        passwordHash: 'hash-maya',
        fitnessLevel: 'beginner',
        age: 27,
        location: 'Boston, MA',
        goals: ['Walking endurance', 'Mobility'],
        bio: 'Building sustainable daily movement habits.',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        members: 12,
        goal: 'Marathon prep',
        sport: 'running',
        captainId: users[0]._id,
      },
      {
        name: 'Velocity Club',
        members: 8,
        goal: 'Sprint interval challenge',
        sport: 'cycling',
        captainId: users[1]._id,
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 45,
        calories: 420,
        date: new Date('2026-09-20T06:30:00Z'),
        notes: 'Tempo run with stride work',
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        durationMinutes: 60,
        calories: 360,
        date: new Date('2026-09-19T18:00:00Z'),
        notes: 'Upper body and core circuit',
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        durationMinutes: 35,
        calories: 280,
        date: new Date('2026-09-18T07:15:00Z'),
        notes: 'Easy spin with recovery focus',
      },
    ]);

    await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        name: 'Ada Sterling',
        score: 980,
        streak: 9,
        rank: 1,
      },
      {
        userId: users[1]._id,
        name: 'Leo Park',
        score: 940,
        streak: 8,
        rank: 2,
      },
      {
        userId: users[2]._id,
        name: 'Maya Chen',
        score: 890,
        streak: 6,
        rank: 3,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'HIIT Power Circuit',
        difficulty: 'advanced',
        durationMinutes: 30,
        focus: 'cardio and power',
        equipment: ['mat', 'dumbbells'],
        instructions: ['Warm up for 5 minutes', 'Alternate 30s work and 15s rest', 'Finish with cooldown'],
      },
      {
        title: 'Core Stability Flow',
        difficulty: 'intermediate',
        durationMinutes: 20,
        focus: 'core strength',
        equipment: ['mat'],
        instructions: ['Plank variations', 'Dead bug sequence', 'Breathing recovery'],
      },
      {
        title: 'Recovery Mobility',
        difficulty: 'beginner',
        durationMinutes: 15,
        focus: 'mobility and recovery',
        equipment: ['mat'],
        instructions: ['Gentle hip stretches', 'Thoracic rotations', 'Breathing reset'],
      },
    ]);

    console.log(`Created ${users.length} users, ${teams.length} teams, and seed records for activities, leaderboard, and workouts.`);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
