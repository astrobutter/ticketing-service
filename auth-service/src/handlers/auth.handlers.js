import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/User.js";
import { env } from "../config/env.js";

function signToken(user) {
  return jwt.sign(
    { userId: user._id.toString(), role: user.role, theaterId: user.theaterId || null },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export async function signupUser(req, res) {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: "Email already in use" });

  const user = await User.create({
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    role: "USER",
    theaterId: null
  });

  res.status(201).json({ token: signToken(user) });
}

export async function signupTheater(req, res) {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: "Email already in use" });

  const theaterId = new mongoose.Types.ObjectId().toString();

  const user = await User.create({
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    role: "THEATER",
    theaterId
  });

  res.status(201).json({ token: signToken(user), theaterId });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  res.json({ token: signToken(user), role: user.role, theaterId: user.theaterId });
}
