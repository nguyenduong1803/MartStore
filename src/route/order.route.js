import express from "express";
import {
  add,
  getAll,
  getOrderById,
  remove,
  update,
} from "../controllers/ordrer.controller";

const router = express.Router();
router.post("/order/add", add);
router.put("/order/update/:id", update);
router.delete("/order/remove/:id", remove);
router.get("/order/:id", getOrderById);
router.get("/order", getAll);
router.get("/order", getAll);

export default router;
