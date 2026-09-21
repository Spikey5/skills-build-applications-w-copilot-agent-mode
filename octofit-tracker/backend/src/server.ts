import express from 'express';
import mongoose from 'mongoose';

import User from './models/user.js';
import Team from './models/team.js';
import Activity from './models/activity.js';
import Leaderboard from './models/leaderboard.js';
import Workout from './models/workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

async function connectDatabase() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to octofit_db');
  } catch (error) {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  }
}

async function sendCollectionResponse(response: any, model: any, collectionName: string) {
  const docs = await model.find({}).lean();
  response.json({
    count: docs.length,
    results: docs,
    collection: collectionName,
    apiBaseUrl,
  });
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected', apiBaseUrl });
});

app.get(['/api/users', '/api/users/'], async (_request, response) => {
  await sendCollectionResponse(response, User, 'users');
});

app.get(['/api/teams', '/api/teams/'], async (_request, response) => {
  await sendCollectionResponse(response, Team, 'teams');
});

app.get(['/api/activities', '/api/activities/'], async (_request, response) => {
  await sendCollectionResponse(response, Activity, 'activities');
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_request, response) => {
  await sendCollectionResponse(response, Leaderboard, 'leaderboard');
});

app.get(['/api/workouts', '/api/workouts/'], async (_request, response) => {
  await sendCollectionResponse(response, Workout, 'workouts');
});

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
    console.log(`API Base URL: ${apiBaseUrl}`);
  });
});
