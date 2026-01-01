import mongoose from "mongoose";

const ShowSchema = new mongoose.Schema(
  {
    showId: { type: String, required: true, unique: true },
    theaterId: { type: String, required: true },
    title: { type: String, required: true },
    startsAt: { type: Date, required: true },
    isPublished: { type: Boolean, default: false },
    seatLayout: { seatIds: { type: [String], default: [] } }
  },
  { timestamps: true }
);

export const Show = mongoose.model("Show", ShowSchema);
