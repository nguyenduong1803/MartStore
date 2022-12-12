import express from "express";
import {
  add,
  getAll,
  getProductById,
  getProductByIds,
  remove,
  update,
} from "../controllers/blog.controller";
import uploadCloudinary from "../middleware/uploadClound";

const router = express.Router();
router.post("/blog/add", add);
router.put("/blog/update/:id", update);
router.delete("/blog/remove/:id", remove);
router.get("/blog/:id", getProductById);
router.get("/blogById/:id", getProductByIds);

router.get("/blog", getAll);
router.post("/blog/upload", uploadCloudinary);
router.get("/blog", getAll);

export default router;
