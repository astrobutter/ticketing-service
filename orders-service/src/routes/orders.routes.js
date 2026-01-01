import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { requireFields } from "../middleware/validateBody.js";
import { createOrder, listOrders } from "../handlers/orders.handlers.js";

const r = Router();

r.post("/orders", requireAuth, requireRole("USER"), requireFields("showId", "seatIds"), createOrder);
r.get("/orders", requireAuth, requireRole("USER"), listOrders);

export default r;
