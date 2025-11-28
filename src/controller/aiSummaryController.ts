import { Request, Response } from "express";
import * as aiSummaryService from "../github/services/aiSummaryService";

export const saveAISummaries = async (req: Request, res: Response) => {
  try {
    const result = await aiSummaryService.saveAISummaries(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: "Failed to save AI summaries",
      detail: err,
    });
  }
};
