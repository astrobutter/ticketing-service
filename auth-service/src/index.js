import express from "express";
import { env } from "./config/env.js";
import { connectMongo } from "./db/connect.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json());

app.get("/health", (_, res) => res.json({ ok: true, service: "auth" }));
app.use("/auth", authRoutes);

await connectMongo();

app.listen(env.PORT, () => console.log(`Auth service listening on ${env.PORT}`));
