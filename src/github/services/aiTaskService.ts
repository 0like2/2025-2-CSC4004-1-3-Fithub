import prisma from "../../prisma";

export const saveAITasks = async (data: any) => {
  const { projectId, tasks, runId } = data;

  if (!Array.isArray(tasks)) {
    throw new Error("tasks must be an array");
  }

  const created = await prisma.task.createMany({
    data: tasks.map((t: any) => ({
      projectId,
      repo_id: t.repo_id ? BigInt(t.repo_id) : null,
      title: t.title,
      description: t.description,
      status: "UNDONE",
      assigneeUserId: t.assigneeUserId || null,
      source: "AI",
      runId,
    })),
  });

  return created;
};
