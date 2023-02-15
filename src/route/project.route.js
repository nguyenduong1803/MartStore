import express from "express";
import {
  add,
  getAll,
  getProjectById,
  getProjectByIds,
  remove,
  update,
} from "../controllers/project.controller";

const router = express.Router();
router.post("/project/add", add);
router.put("/project/update/:id", update);
router.delete("/project/remove/:id", remove);
router.get("/projectById", getProjectByIds);
router.get("/projectById/:id", getProjectById);
router.get("/project", getAll);

export default router;
