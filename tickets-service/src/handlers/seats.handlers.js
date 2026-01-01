import { Seat } from "../models/Seat.js";
import { Show } from "../models/Show.js";
import { redis } from "../db/redis.js";

export async function getSeats(req, res) {
  const { showId } = req.params;

  const show = await Show.findOne({ showId });
  if (!show || !show.isPublished) return res.status(404).json({ error: "Show not found" });

  const seats = await Seat.find({ showId }).lean();

  const result = [];
  for (const seat of seats) {
    const key = `seatHold:${showId}:${seat.seatId}`;
    const heldBy = await redis.get(key);
    if (heldBy) {
      result.push({ showId, seatId: seat.seatId, status: "HELD", heldByUserId: heldBy });
    } else {
      result.push({ showId, seatId: seat.seatId, status: seat.status });
    }
  }

  res.json({ seats: result });
}

export function holdSeatsFactory({ broadcast }) {
  return async function holdSeats(req, res) {
    const { showId } = req.params;
    const { seatIds } = req.body;
    const userId = req.user.userId;

    if (!Array.isArray(seatIds) || seatIds.length === 0) {
      return res.status(400).json({ error: "seatIds must be a non-empty array" });
    }

    const booked = await Seat.findOne({ showId, seatId: { $in: seatIds }, status: "BOOKED" }).lean();
    if (booked) return res.status(409).json({ error: "One or more seats already booked" });

    const held = [];
    try {
      for (const seatId of seatIds) {
        const key = `seatHold:${showId}:${seatId}`;
        const ok = await redis.set(key, userId, { NX: true, EX: process.env.SEAT_HOLD_TTL_SECONDS });
        if (!ok) throw new Error(`Seat ${seatId} already held`);
        held.push(seatId);
        broadcast({ type: "seat-held", showId, seatId, userId });
      }
      return res.json({ ok: true, heldSeatIds: held, expiresInSeconds: process.env.SEAT_HOLD_TTL_SECONDS });
    } catch (e) {
      for (const seatId of held) {
        const key = `seatHold:${showId}:${seatId}`;
        const current = await redis.get(key);
        if (current == userId) await redis.del(key);
        broadcast({ type: "seat-released", showId, seatId, userId });
      }
      return res.status(409).json({ error: e.message });
    }
  };
}

export function confirmSeatsFactory({ broadcast }) {
  return async function confirmSeats(req, res) {
    const { showId } = req.params;
    const { seatIds } = req.body;

    if (!Array.isArray(seatIds) || seatIds.length === 0) {
      return res.status(400).json({ error: "seatIds must be a non-empty array" });
    }

    await Seat.updateMany({ showId, seatId: { $in: seatIds } }, { $set: { status: "BOOKED" } });

    for (const seatId of seatIds) {
      await redis.del(`seatHold:${showId}:${seatId}`);
      broadcast({ type: "seat-booked", showId, seatId });
    }

    res.json({ ok: true });
  };
}
