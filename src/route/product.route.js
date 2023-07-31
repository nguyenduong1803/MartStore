import express from "express";
import { fileUploader,upload } from "../cloudinary.config";
import {
  add,
  getAll,
  getProductById,
  getProductByIds,
  remove,
  update,
} from "../controllers/product.controller";
import uploadCloudinary from "../middleware/uploadClound";

const router = express.Router();
router.post("/product/add", add);
router.put("/product/update/:id", update);
router.delete("/product/remove/:id", remove);
router.get("/productById", getProductById);
router.get("/productById/:id", getProductByIds);
router.post("/product/upload", uploadCloudinary);
router.get("/product", getAll);

export default router;
