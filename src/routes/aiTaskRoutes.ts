import { Router } from "express";
import { saveAITasks } from "../controller/aiTaskController";

const router = Router();

router.post("/", saveAITasks);

export default router;
