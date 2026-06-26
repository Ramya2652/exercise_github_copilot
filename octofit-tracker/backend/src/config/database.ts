import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  await mongoose.connect(mongoUri);
  return mongoose.connection;
};
