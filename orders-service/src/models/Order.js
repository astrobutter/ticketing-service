import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    showId: { type: String, required: true },
    seatIds: { type: [String], required: true },
    status: { type: String, enum: ["CREATED", "CANCELLED", "PAID"], default: "CREATED" }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
