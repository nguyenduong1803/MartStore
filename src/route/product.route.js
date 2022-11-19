import express from "express";
import { login } from "../controllers/auth.controller";
import {
  add,
  getAll,
  getProductById,
  remove,
  update,
} from "../controllers/product.controller";
import checkAuth from "../middleware/checkAuth";

const router = express.Router();
router.post("/product/add", add);
router.get("/product/:id", getProductById);
router.put("/product/:id", update);
router.delete("/product/:id", remove);
router.post("/auth", checkAuth,login);
router.get("/", getAll);

export default router;
