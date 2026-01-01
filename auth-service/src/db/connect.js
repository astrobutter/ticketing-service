import mongoose from "mongoose";
import { env } from "../config/env.js";

export async function connectMongo() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Auth Mongo connected");
}
