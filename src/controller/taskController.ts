import { Request, Response } from "express";
import prisma from "../prisma";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.projectId);

    const tasks = await prisma.task.findMany({
      where: { projectId },
      include: {
        assignee: true,
      },
    });

    res.json(tasks);
  } catch (err) {
    console.error("Get tasks error:", err);
    res.status(500).json({ error: "Failed to get tasks" });
  }
};


//update task status
export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.taskId);
    const { status } = req.body;

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: { status },
      include: { assignee: true },
    });

    res.json(updated);
  } catch (err) {
    console.error("Update task status error:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
};
