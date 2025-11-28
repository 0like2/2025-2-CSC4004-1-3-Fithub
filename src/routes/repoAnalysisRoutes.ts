import { Router } from "express";
import { analyzeRepository } from "../controller/repoAnalysisController";

const router = Router();

router.post("/analyze", analyzeRepository);

export default router;
