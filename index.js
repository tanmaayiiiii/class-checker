import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import userRoutes from './routes/class.routes.js';

dotenv.config();
const app = express();

const connectDB = async () => {
    try {
      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
      console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
      console.log("MongoDB connection FAILED", error);
      process.exit(1);  // Exit the process with failure
    }
  };

  connectDB();

  app.use(express.json()); // Middleware to parse JSON bodies


  app.get('/', (req,res) => {
    res.send("Server works OMG");
  });

  const PORT = process.env.PORT || 3000

  app.use('/api/classes', userRoutes);

  app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
  });
  

