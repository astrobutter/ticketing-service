import { Order } from "../models/Order.js";
import { publish } from "../kafka/producer.js";

export async function createOrder(req, res) {
  const { showId, seatIds } = req.body;
  const userId = req.user.userId;

  if (!Array.isArray(seatIds) || seatIds.length === 0) {
    return res.status(400).json({ error: "seatIds must be a non-empty array" });
  }

  const order = await Order.create({ userId, showId, seatIds, status: "CREATED" });

  await publish("order.created", {
    orderId: order._id.toString(),
    userId,
    showId,
    seatIds,
    status: order.status,
    createdAt: order.createdAt
  });

  res.status(201).json({ order });
}

export async function listOrders(req, res) {
  const userId = req.user.userId;
  const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();
  res.json({ orders });
}
