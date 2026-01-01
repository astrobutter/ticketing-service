import { createClient } from "redis";
import { env } from "../config/env.js";

export const redis = createClient({ url: process.env.REDIS_URL });

export async function connectRedis() {
  redis.on("error", (e) => console.error("Redis error", e));
  await redis.connect();
  console.log("Redis connected");
}
