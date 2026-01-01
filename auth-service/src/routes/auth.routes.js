import { Router } from "express";
import { requireFields } from "../middleware/validateBody.js";
import { signupUser, signupTheater, login } from "../handlers/auth.handlers.js";

const r = Router();

r.post("/signup-user", requireFields("email", "password"), signupUser);
r.post("/signup-theater", requireFields("email", "password"), signupTheater);
r.post("/login", requireFields("email", "password"), login);

export default r;
