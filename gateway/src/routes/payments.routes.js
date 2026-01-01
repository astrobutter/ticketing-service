import { Router } from "express";
import axios from "axios";
import { env } from "../config/env.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const r = Router();

r.post("/payments", requireAuth, requireRole("USER"), async (req, res) => {
  const resp = await axios.post(`${env.PAYMENTS_URL}/payments`, req.body, {
    headers: { authorization: req.headers.authorization }
  });
  res.status(resp.status).json(resp.data);
});

export default r;
