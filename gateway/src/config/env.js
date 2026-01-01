import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: Number(process.env.GATEWAY_PORT || 4000),
  JWT_SECRET: process.env.JWT_SECRET || "change_me",
  AUTH_URL: process.env.AUTH_URL || "http://localhost:4001",
  TICKETS_URL: process.env.TICKETS_URL || "http://localhost:4002",
  ORDERS_URL: process.env.ORDERS_URL || "http://localhost:4003",
  PAYMENTS_URL: process.env.PAYMENTS_URL || "http://localhost:4004"
};
