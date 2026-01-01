import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    orderId: { type: String, required: true, index: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["PAID", "FAILED"], default: "PAID" }
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", PaymentSchema);
