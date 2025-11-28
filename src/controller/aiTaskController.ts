import { Request, Response } from "express";
import * as aiTaskService from "../github/services/aiTaskService";

export const saveAITasks = async (req: Request, res: Response) => {
  try {
    const result = await aiTaskService.saveAITasks(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to save AI tasks" });
  }
};
