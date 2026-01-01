import express from "express";
import { env } from "./config/env.js";
import { connectMongo } from "./db/connect.js";
import paymentsRoutes from "./routes/payments.routes.js";
import { connectProducer } from "./kafka/producer.js";

const app = express();
app.use(express.json());

app.get("/health", (_, res) => res.json({ ok: true, service: "payments" }));
app.use(paymentsRoutes);

await connectMongo();
await connectProducer();

app.listen(env.PORT, () => console.log(`Payments service listening on ${env.PORT}`));
