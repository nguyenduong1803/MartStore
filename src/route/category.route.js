import express from "express";
import { add, remove, update,getcategoryById,getAll } from "../controllers/category.cotroller";

const router = express.Router();
router.post("/category/add", add);
router.put("/category/update/:id", update);
router.delete("/category/remove/:id", remove);
router.get("/category/:id", getcategoryById);
router.get("/category", getAll);
export default router;
