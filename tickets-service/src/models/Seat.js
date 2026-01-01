import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema(
  {
    showId: { type: String, required: true, index: true },
    seatId: { type: String, required: true },
    status: { type: String, enum: ["AVAILABLE", "BOOKED"], default: "AVAILABLE" }
  },
  { timestamps: true }
);

SeatSchema.index({ showId: 1, seatId: 1 }, { unique: true });

export const Seat = mongoose.model("Seat", SeatSchema);
