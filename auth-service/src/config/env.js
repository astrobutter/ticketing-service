import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: Number(process.env.AUTH_PORT || 4001),
  JWT_SECRET: process.env.JWT_SECRET || "change_me",
  MONGO_URI: process.env.AUTH_MONGO_URI || "mongodb://127.0.0.1:27017/auth"
};
