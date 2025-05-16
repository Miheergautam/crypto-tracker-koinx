import mongoose from 'mongoose';
import express from 'express';
import { storeCryptoStats } from './src/services/cryptoService.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(async () => {
    console.log("Connected to MongoDB");
    try {
      await storeCryptoStats();
      console.log("Crypto stats stored successfully!");
    } catch (error) {
      console.error("Error storing crypto stats:", error);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
