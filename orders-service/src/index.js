import express from "express";
import { env } from "./config/env.js";
import { connectMongo } from "./db/connect.js";
import ordersRoutes from "./routes/orders.routes.js";
import { connectProducer } from "./kafka/producer.js";

const app = express();
app.use(express.json());

app.get("/health", (_, res) => res.json({ ok: true, service: "orders" }));
app.use(ordersRoutes);

await connectMongo();
await connectProducer();

app.listen(env.PORT, () => console.log(`Orders service listening on ${env.PORT}`));
