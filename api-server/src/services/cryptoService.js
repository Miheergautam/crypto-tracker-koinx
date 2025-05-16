import axios from "axios";
import CryptoStat from "../models/cryptoStatsModel.js";
import dotenv from "dotenv";
dotenv.config();

export const storeCryptoStats = async () => {
  const ids = ["bitcoin", "ethereum", "matic-network"];
  const url = `${process.env.COINGECKO_BASE_URL}/simple/price`;

  const {data} = await axios.get(url, {
    params: {
      ids: ids.join(','),
      vs_currencies: "usd",
      include_market_cap: "true",
      include_24hr_change: "true",
      include_24hr_vol: "true",
    },
  });

  for (const coin of ids) {
    await CryptoStat.create({
      coinId: coin,
      price: data[coin].usd,
      usd_market_cap: data[coin].usd_market_cap,
      usd_24h_change: data[coin].usd_24h_change,
      usd_24h_vol: data[coin].usd_24h_vol,
    });
  }
};
