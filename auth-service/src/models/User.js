import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ["USER", "THEATER", "ADMIN"], default: "USER" },
    theaterId: { type: String, default: null }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
