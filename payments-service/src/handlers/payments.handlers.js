import { Payment } from "../models/Payment.js";
import { publish } from "../kafka/producer.js";

export async function createPayment(req, res) {
  const userId = req.user.userId;
  const { orderId, amount, showId, seatIds } = req.body;

  const payment = await Payment.create({ userId, orderId, amount, status: "PAID" });

  await publish("payment.completed", {
    paymentId: payment._id.toString(),
    orderId,
    userId,
    amount,
    showId,
    seatIds,
    status: "PAID",
    createdAt: payment.createdAt
  });

  res.status(201).json({ payment });
}
