import express from "express";
import CryptoStat from "../models/cryptoStatsModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    res.status(404).json({ message: "Coin not found" });
  }

  const stat = await CryptoStat.findOne({ coinId: coin }).sort({
    timestamp: -1,
  });

  if (!stat) return res.status(404).json({ error: "Data not found" });

  res.json({
    price: stat.price,
    usd_market_cap: stat.usd_market_cap,
    usd_24h_change: stat.usd_24h_change,
  });
});

export default router;
