import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { getSeats, holdSeatsFactory, confirmSeatsFactory } from "../handlers/seats.handlers.js";

export function createSeatsRouter({ broadcast }) {
  const r = Router();

  r.get("/shows/:showId/seats", getSeats);

  r.post("/shows/:showId/hold",
    requireAuth,
    requireRole("USER"),
    holdSeatsFactory({ broadcast })
  );

  // Intended after payment success (secure later with service key or Kafka consumer)
  r.post("/shows/:showId/confirm",
    confirmSeatsFactory({ broadcast })
  );

  return r;
}
