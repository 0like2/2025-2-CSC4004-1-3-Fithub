import axios from "axios";
import prisma from "../../prisma";

const AI_SERVER = process.env.AI_SERVER;
interface GenerateTasksParams {
  summaries: any[];   
  graph: any;         //Graph JSON
  context: any;       //ContextMeta JSON
  repoId?: bigint;    
}

export const generateTasks = async (params: GenerateTasksParams) => {
  const { summaries, graph, context } = params;

  const response = await axios.post(`${AI_SERVER}/tasks`, {
    repo_summaries: summaries,
    graph_json: graph,
    context_meta: context,
  });

  const tasks = response.data.tasks;

  await prisma.task.createMany({
    data: tasks.map((t: any) => ({
      title: t.title,
      description: t.description,
      role: t.role ?? "Unknown",
      priority: t.priority ?? "Medium",
    })),
  });

  return tasks;
};
