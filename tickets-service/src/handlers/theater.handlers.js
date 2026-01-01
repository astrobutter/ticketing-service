import { Show } from "../models/Show.js";
import { Seat } from "../models/Seat.js";

export async function createShow(req, res) {
  const { showId, title, startsAt, seatIds } = req.body;
  const theaterId = req.user.theaterId;

  const show = await Show.create({
    showId,
    theaterId,
    title,
    startsAt: new Date(startsAt),
    seatLayout: { seatIds: Array.isArray(seatIds) ? seatIds : [] },
    isPublished: false
  });

  if (Array.isArray(seatIds) && seatIds.length) {
    await Seat.insertMany(seatIds.map((s) => ({ showId, seatId: s, status: "AVAILABLE" })));
  }

  res.status(201).json({ show });
}

export async function updateSeatingLayout(req, res) {
  const { seatIds } = req.body;
  const { showId } = req.params;

  const show = await Show.findOne({ showId });
  if (!show) return res.status(404).json({ error: "Show not found" });
  if (show.theaterId !== req.user.theaterId) return res.status(403).json({ error: "Not your show" });

  show.seatLayout = { seatIds: Array.isArray(seatIds) ? seatIds : [] };
  await show.save();

  if (Array.isArray(seatIds)) {
    for (const s of seatIds) {
      await Seat.updateOne(
        { showId, seatId: s },
        { $setOnInsert: { status: "AVAILABLE" } },
        { upsert: true }
      );
    }
  }

  res.json({ show });
}

export async function publishShow(req, res) {
  const { showId } = req.params;

  const show = await Show.findOne({ showId });
  if (!show) return res.status(404).json({ error: "Show not found" });
  if (show.theaterId !== req.user.theaterId) return res.status(403).json({ error: "Not your show" });

  show.isPublished = true;
  await show.save();

  res.json({ show });
}
