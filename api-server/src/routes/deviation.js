import express from "express";
import CryptoStat from "../models/cryptoStatsModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res
      .status(400)
      .json({ message: "Coin query parameter is required" });
  }

  try {
    const stats = await CryptoStat.find({ coinId: coin })
      .sort({ createdAt: -1 })
      .limit(100);

    if (stats.length === 0) {
      return res.status(404).json({ message: "No stats found for this coin" });
    }

    const prices = stats.map((s) => s.price);

    // Calculate mean
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;

    // Calculate variance
    const variance =
      prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
      prices.length;

    // Standard deviation
    const stdDeviation = Math.sqrt(variance);

    res.json({ deviation: Number(stdDeviation.toFixed(2)) });
  } catch (error) {
    console.error("Error fetching crypto stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
