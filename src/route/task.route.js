import express from "express";
import {
  add,
  getAll,
  remove,
  getTaskById,
  getTaskByIds,
  update,
  getTaskByIdTask,
} from "../controllers/task.controller";

const router = express.Router();
router.post("/task/add", add);
router.put("/task/update/:id", update);
router.delete("/task/remove/:id", remove);
router.get("/taskById", getTaskByIds);
router.get("/taskById/:id", getTaskById);
router.get("/taskByIdTask/:id", getTaskByIdTask);
router.get("/task", getAll);

export default router;
