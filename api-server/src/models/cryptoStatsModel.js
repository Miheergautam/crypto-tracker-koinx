import mongoose from "mongoose";

const CryptoStatSchema = new mongoose.Schema({
  coinId: { type: String },
  price: { type: Number },
  usd_market_cap: { type: Number },
  usd_24h_vol: { type: Number },
  usd_24h_change: { type: Number },
},{timestamps:true});

const CryptoStats = mongoose.model("CryptoStat", CryptoStatSchema);

export default CryptoStats;
