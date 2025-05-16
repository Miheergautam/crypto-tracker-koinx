import express from "express";
import CryptoStat from "../models/cryptoStatsModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ message: "Coin query parameter is required" });
  }

  try {
    const stat = await CryptoStat.findOne({ coinId: coin }).sort({ createdAt: -1 });

    if (!stat) return res.status(404).json({ error: "Data not found" });

    res.json({
      price: stat.price,
      usd_market_cap: stat.usd_market_cap,
      usd_24h_change: stat.usd_24h_change,
    });
  } catch (error) {
    console.error("Error fetching stat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
