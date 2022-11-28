import express from "express";
import { uploadCloud,cloudinary } from "../cloudinary.config";
import { login } from "../controllers/auth.controller";
import {
  add,
  getAll,
  getProductById,
  remove,
  update,
} from "../controllers/product.controller";
import checkAuth from "../middleware/checkAuth";
import uploadCloudinary from "../middleware/uploadClound";

const router = express.Router();
router.post("/product/add", add);
router.put("/product/update/:id", update);
router.delete("/product/remove/:id", remove);
router.get("/product/:id", getProductById);
router.get("/product", getAll);
router.post("/product/upload",uploadCloud.single("files"), uploadCloudinary);
export default router;
