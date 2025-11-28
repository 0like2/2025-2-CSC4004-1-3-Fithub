import { Request, Response } from "express";
import * as githubService from "../github/githubService";
import * as aiSummaryService from "../github/services/aiSummaryService";
import * as aiEmbeddingService from "../github/services/aiEmbeddingService";
import * as aiRepoAnalysisService from "../github/services/aiRepoAnalysisService";
import * as aiGraphService from "../github/services/aiGraphService";
import * as aiTaskService from "../github/services/aiTaskService";

export const analyzeRepository = async (req: Request, res: Response) => {
  try {
    const { owner, repo } = req.body;
    const token = process.env.GITHUB_TOKEN as string;

    const files = await githubService.getAllFiles(owner, repo, token);

    const summaries: any[] = [];

    for (const file of files) {
      const filePath = file.path ?? "";
      const content = await githubService.getFileContent(owner, repo, filePath, token);
      if (!content) continue;

      const summary = await aiSummaryService.createSummary({
        filePath,
        content,
      });

      summaries.push(summary);
    }

    const embeddings = await aiEmbeddingService.generateEmbeddings({ summaries });

    const contextMeta = await aiRepoAnalysisService.analyzeRepository({
      summaries,
      embeddings,
    });

    const finalGraph = await aiGraphService.generateGraph({
      summaries,
      embeddings,
      contextMeta,
    });

    const tasks = await aiTaskService.generateTasks({
      summaries,
      graph: finalGraph,
      context: contextMeta,
    });

    res.json({
      summaries,
      embeddings,
      contextMeta,
      finalGraph,
      tasks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Repo analysis failed" });
  }
};
