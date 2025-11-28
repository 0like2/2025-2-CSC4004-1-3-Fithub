import prisma from "../../prisma";

export const getSummariesByProject = async (projectId: number) => {
  return await prisma.codeSummary.findMany({
    where: { projectId },
  });
};
