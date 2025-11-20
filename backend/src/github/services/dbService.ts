import prisma from "../../prisma";

export const dbService = {
  
  //repository
  async getRepo(repoId: string) {
    return prisma.repository.findUnique({
      where: { repo_id: BigInt(repoId) },
    });
  },

  //files
  async getRepoFiles(repoId: string) {
    return prisma.file.findMany({
      where: { repo_id: BigInt(repoId) },
      orderBy: { path: "asc" },
    });
  },

  async getFileDetail(repoId: string, fileId: string) {
    return prisma.file.findFirst({
      where: {
        repo_id: BigInt(repoId),
        file_id: fileId,
      },
    });
  },

  //commits
  async getRepoCommits(repoId: string) {
    return prisma.commit.findMany({
      where: { repo_id: BigInt(repoId) },
      orderBy: { date: "desc" },
    });
  },

  async getCommitDetail(repoId: string, sha: string) {
    return prisma.commit.findFirst({
      where: {
        repo_id: BigInt(repoId),
        commit_sha: sha,
      },
    });
  },

  //issues
  async getRepoIssues(repoId: string) {
    return prisma.issue.findMany({
      where: { repo_id: BigInt(repoId) },
      orderBy: { created_at: "desc" },
    });
  },

  async getIssueDetail(repoId: string, issueId: string) {
    return prisma.issue.findFirst({
      where: {
        repo_id: BigInt(repoId),
        issue_id: Number(issueId),
      },
    });
  },

  //pull requests
  async getRepoPulls(repoId: string) {
    return prisma.pull.findMany({
      where: { repo_id: BigInt(repoId) },
      orderBy: { created_at: "desc" },
    });
  },

  async getPullDetail(repoId: string, pullId: string) {
    return prisma.pull.findFirst({
      where: {
        repo_id: BigInt(repoId),
        pull_id: Number(pullId),
      },
    });
  },
};
