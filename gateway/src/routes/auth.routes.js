import { Router } from "express";
import axios from "axios";
import { env } from "../config/env.js";
import { requireAuth } from "../middleware/requireAuth.js";

const r = Router();

r.post("/signup-user", async (req, res) => {
  const resp = await axios.post(`${env.AUTH_URL}/auth/signup-user`, req.body);
  res.status(resp.status).json(resp.data);
});

r.post("/signup-theater", async (req, res) => {
  const resp = await axios.post(`${env.AUTH_URL}/auth/signup-theater`, req.body);
  res.status(resp.status).json(resp.data);
});

r.post("/login", async (req, res) => {
  const resp = await axios.post(`${env.AUTH_URL}/auth/login`, req.body);
  res.status(resp.status).json(resp.data);
});

r.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default r;
