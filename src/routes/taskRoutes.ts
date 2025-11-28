import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware";
import { requireProjectMember } from "../middleware/projectAuth";
import { getTasks, updateTaskStatus } from "../controller/taskController";

const router = Router();

router.get(
  "/:projectId",
  requireAuth,
  requireProjectMember,
  getTasks
);

router.put(
  "/:taskId",
  requireAuth,
  updateTaskStatus
);

export default router;
