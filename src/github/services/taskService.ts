import prisma from "../../prisma";

export const getTasksByProject = async (projectId: number) => {
  return await prisma.task.findMany({
    where: { projectId },
  });
};

export const updateTaskStatus = async (taskId: number, status: string) => {
  return await prisma.task.update({
    where: { id: taskId },
    data: { status:{set:"UNDONE"} },
  });
};

export const updateTaskAssignee = async (
  taskId: number,
  assigneeUserId: number
) => {
  return await prisma.task.update({
    where: { id: taskId },
    data: { assigneeUserId },
  });
};
