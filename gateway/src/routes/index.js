import { Router } from "express";
import authRoutes from "./auth.routes.js";
import ticketsRoutes from "./tickets.routes.js";
import ordersRoutes from "./orders.routes.js";
import paymentsRoutes from "./payments.routes.js";

const router = Router();
router.use("/api/auth", authRoutes);
router.use("/api", ticketsRoutes);
router.use("/api", ordersRoutes);
router.use("/api", paymentsRoutes);

export default router;
