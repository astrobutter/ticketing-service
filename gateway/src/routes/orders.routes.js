import { Router } from "express";
import axios from "axios";
import { env } from "../config/env.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const r = Router();

r.post("/orders", requireAuth, requireRole("USER"), async (req, res) => {
  const resp = await axios.post(`${env.ORDERS_URL}/orders`, req.body, {
    headers: { authorization: req.headers.authorization }
  });
  res.status(resp.status).json(resp.data);
});

r.get("/orders", requireAuth, requireRole("USER"), async (req, res) => {
  const resp = await axios.get(`${env.ORDERS_URL}/orders`, {
    headers: { authorization: req.headers.authorization }
  });
  res.status(resp.status).json(resp.data);
});

export default r;
