import axios from "axios";

const AI_SERVER = process.env.AI_SERVER;

interface GenerateGraphParams {
  summaries: any[];
  embeddings: any[];
  contextMeta: any;
}

export const generateGraph = async (params: GenerateGraphParams) => {
  const { summaries, embeddings, contextMeta } = params;

  const response = await axios.post(`${AI_SERVER}/graph`, {
    summaries,
    embeddings,
    context_meta: contextMeta,
  });

  return response.data.final_graph;
};
