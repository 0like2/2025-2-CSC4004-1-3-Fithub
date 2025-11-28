import prisma from "../../prisma";

export const saveAISummaries = async (data: any) => {
  const { projectId, runId, summaries } = data;

  if (!Array.isArray(summaries)) {
    throw new Error("summaries must be an array");
  }

  const created = await prisma.codeSummary.createMany({
    data: summaries.map((s: any) => ({
      projectId,
      repo_id: s.repo_id ? BigInt(s.repo_id) : null,
      runId,
      targetId: s.target_id,
      level: s.level,
      summaryText: s.text,
      modelName: s.model,
    })),
  });

  return created;
};
