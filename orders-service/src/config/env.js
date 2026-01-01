import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: Number(process.env.ORDERS_PORT || 4003),
  JWT_SECRET: process.env.JWT_SECRET || "change_me",
  MONGO_URI: process.env.ORDERS_MONGO_URI || "mongodb://127.0.0.1:27017/orders",
  KAFKA_BROKERS: (process.env.KAFKA_BROKERS || "localhost:9092").split(",")
};
