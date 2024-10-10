import { Document, model, Schema } from "mongoose";

export interface ICrypto extends Document {
  coinId: string;
  name: string;
  current_price_usd: number;
  market_cap_usd: number;
  price_change_24h: number;
  timestamp: Date;
}

const cryptoSchema = new Schema({
  coinId: String,
  name: String,
  current_price_usd: Number,
  market_cap_usd: Number,
  price_change_24h: Number,
  timestamp: { type: Date, default: Date.now },
});

export const CryptoPrice = model<ICrypto>("CryptoPrice", cryptoSchema);
