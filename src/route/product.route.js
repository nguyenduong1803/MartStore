import express from "express";
import { uploadCloud,cloudinary } from "../cloudinary.config";
import {
  add,
  getAll,
  getProductById,
  remove,
  update,
} from "../controllers/product.controller";
import uploadCloudinary from "../middleware/uploadClound";

const router = express.Router();
router.post("/product/add", add);
router.get("/product/:id", getProductById);
router.put("/product/update/:id", update);
router.delete("/product/:id", remove);
router.post("/product/upload",uploadCloud.single("files"), uploadCloudinary);
router.get("/product", getAll);

export default router;
