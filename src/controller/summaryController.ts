import { Request, Response } from "express";
import prisma from "../prisma";

export const getSummaries = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.projectId);

    const summaries = await prisma.codeSummary.findMany({
      where: { projectId },
      include: {
        repository: true,
      },
    });

    res.json(summaries);
  } catch (err) {
    console.error("Get summaries error:", err);
    res.status(500).json({ error: "Failed to get summaries" });
  }
};

