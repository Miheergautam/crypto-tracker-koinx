import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import statsRoutes from "./src/routes/stats.js";
import deviationRoutes from "./src/routes/deviation.js"

import { startConsumer } from "./src/services/kafkaConsumer.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/stats", statsRoutes);
app.use("/deviation", deviationRoutes);

// Catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    
    // Start Kafka consumer after DB connection
    await startConsumer();

    // Optionally run initial stats fetch on startup
    // await storeCryptoStats();

    console.log("API Server ready");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});