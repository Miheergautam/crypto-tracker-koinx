import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import statsRoutes from "./src/routes/stats.js";
import { storeCryptoStats } from "./src/services/cryptoService.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/stats", statsRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await storeCryptoStats();
    console.log("Saved successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});