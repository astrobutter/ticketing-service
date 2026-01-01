import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: Number(process.env.TICKETS_PORT || 4002),
  WS_PORT: Number(process.env.TICKETS_WS_PORT || 4050),
  JWT_SECRET: process.env.JWT_SECRET || "change_me",
  MONGO_URI: process.env.TICKETS_MONGO_URI || "mongodb://127.0.0.1:27017/tickets",
  REDIS_URL: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  SEAT_HOLD_TTL_SECONDS: Number(process.env.SEAT_HOLD_TTL_SECONDS || 300)
};
