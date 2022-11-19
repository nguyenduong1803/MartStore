import express from "express";
import { login, register } from "../controllers/auth.controller";
import checkAuth from "../middleware/checkAuth";
const authRoute = express.Router();

authRoute.post("/auth/register", register);
authRoute.post("/auth/login", checkAuth, login);
export default authRoute;
