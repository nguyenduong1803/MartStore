import express from "express";
import { login, register,authorization } from "../controllers/auths.controller";
import verifyToken from "../middleware/authenticateToken";
import checkAuth from "../middleware/checkAuth";
const authRoute = express.Router();

authRoute.post("/auths/register", register);
authRoute.post("/auths/login", checkAuth, login);
authRoute.post("/auths/verifyToken", verifyToken, authorization);
export default authRoute;
