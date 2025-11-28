import axios from "axios";
const AI_SERVER = process.env.AI_SERVER;

interface AnalyzeRepositoryParams {
  summaries: any[];
  embeddings: any[];
}

export const analyzeRepository = async (params: AnalyzeRepositoryParams) => {
  const { summaries, embeddings } = params;

  const response = await axios.post(`${AI_SERVER}/repo-analysis`, {
    summaries,
    embeddings,
  });

  return response.data.context_meta;
};
