import { Router } from "express";
import axios from "axios";
import { env } from "../config/env.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const r = Router();

// Public
r.get("/shows/:showId/seats", async (req, res) => {
  const resp = await axios.get(`${env.TICKETS_URL}/shows/${req.params.showId}/seats`);
  res.status(resp.status).json(resp.data);
});

// THEATER routes
r.post("/shows", requireAuth, requireRole("THEATER"), async (req, res) => {
  const resp = await axios.post(`${env.TICKETS_URL}/shows`, req.body, {
    headers: { authorization: req.headers.authorization }
  });
  res.status(resp.status).json(resp.data);
});

r.put("/shows/:showId/seating-layout", requireAuth, requireRole("THEATER"), async (req, res) => {
  const resp = await axios.put(`${env.TICKETS_URL}/shows/${req.params.showId}/seating-layout`, req.body, {
    headers: { authorization: req.headers.authorization }
  });
  res.status(resp.status).json(resp.data);
});

r.post("/shows/:showId/publish", requireAuth, requireRole("THEATER"), async (req, res) => {
  const resp = await axios.post(`${env.TICKETS_URL}/shows/${req.params.showId}/publish`, req.body, {
    headers: { authorization: req.headers.authorization }
  });
  res.status(resp.status).json(resp.data);
});

// USER routes
r.post("/shows/:showId/hold", requireAuth, requireRole("USER"), async (req, res) => {
  const resp = await axios.post(`${env.TICKETS_URL}/shows/${req.params.showId}/hold`, req.body, {
    headers: { authorization: req.headers.authorization }
  });
  res.status(resp.status).json(resp.data);
});

export default r;
