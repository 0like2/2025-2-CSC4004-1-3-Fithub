import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware";
import { requireProjectMember } from "../middleware/projectAuth";
import { getSummaries } from "../controller/summaryController";

const router = Router();

router.get(
  "/:projectId",
  requireAuth,
  requireProjectMember,
  getSummaries
);

export default router;
