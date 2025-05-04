// backend/seeder.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import User from './models/User.js';

dotenv.config();
await connectDB();

const seedAdmin = async () => {
  const adminExists = await User.findOne({ email: 'admin@example.com' });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      isAdmin: true,
    });
    console.log('Admin user created');
  } else {
    console.log('Admin already exists');
  }

  process.exit();
};

seedAdmin();
