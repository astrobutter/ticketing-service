import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { requireFields } from "../middleware/validateBody.js";
import { createShow, updateSeatingLayout, publishShow } from "../handlers/theater.handlers.js";

const r = Router();

r.post("/shows",
  requireAuth,
  requireRole("THEATER"),
  requireFields("showId", "title", "startsAt"),
  createShow
);

r.put("/shows/:showId/seating-layout",
  requireAuth,
  requireRole("THEATER"),
  updateSeatingLayout
);

r.post("/shows/:showId/publish",
  requireAuth,
  requireRole("THEATER"),
  publishShow
);

export default r;
