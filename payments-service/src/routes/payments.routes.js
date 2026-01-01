import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { requireFields } from "../middleware/validateBody.js";
import { createPayment } from "../handlers/payments.handlers.js";

const r = Router();

r.post("/payments", requireAuth, requireRole("USER"), requireFields("orderId", "amount", "showId", "seatIds"), createPayment);

export default r;
