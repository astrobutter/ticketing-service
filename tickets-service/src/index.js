import express from "express";
import { env } from "./config/env.js";
import { connectMongo } from "./db/connect.js";
import { connectRedis } from "./db/redis.js";
import { createWSS } from "./realtime/ws.js";

import theaterRoutes from "./routes/theater.routes.js";
import { createSeatsRouter } from "./routes/seats.routes.js";

const app = express();
app.use(express.json());

app.get("/health", (_, res) => res.json({ ok: true, service: "tickets" }));

await connectMongo();
await connectRedis();

const { broadcast } = createWSS();

app.use(theaterRoutes);
app.use(createSeatsRouter({ broadcast }));

app.listen(env.PORT, () => console.log(`Tickets service listening on ${env.PORT}`));
