import express from "express";
import {
  login,
  register,
  authorization,
  getAll,
} from "../controllers/users.controller";
import verifyToken from "../middleware/authenticateToken";
import checkAuth from "../middleware/checkAuth";
import checkGoogle from "../middleware/checkGoogle";
const authRoute = express.Router();

authRoute.get("/auths", getAll);
authRoute.post("/auths/register", register);
authRoute.post("/auths/login", checkAuth, login);
authRoute.post("/auths/google", checkGoogle, login);
authRoute.post("/auths/verifyToken", verifyToken, authorization);
export default authRoute;
