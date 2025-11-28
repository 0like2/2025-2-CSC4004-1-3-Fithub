import { Router } from "express";
import { saveAISummaries } from "../controller/aiSummaryController";

const router = Router();

router.post("/", saveAISummaries);

export default router;
