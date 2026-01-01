import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: Number(process.env.PAYMENTS_PORT || 4004),
  JWT_SECRET: process.env.JWT_SECRET || "change_me",
  MONGO_URI: process.env.PAYMENTS_MONGO_URI || "mongodb://127.0.0.1:27017/payments",
  KAFKA_BROKERS: (process.env.KAFKA_BROKERS || "localhost:9092").split(",")
};
