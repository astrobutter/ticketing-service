import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";
import { env } from "./config/env.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_, res) => res.json({ ok: true, service: "gateway" }));
app.use(routes);

app.listen(env.PORT, () => console.log(`Gateway listening on ${env.PORT}`));
