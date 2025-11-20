import { createGitHubClient } from "../client/githubClient";

export const commitService = {
  
  //Commit 리스트 조회
  async getCommits(owner: string, repo: string, token: string) {
    const octokit = createGitHubClient(token);

    const res = await octokit.request("GET /repos/{owner}/{repo}/commits", {
      owner,
      repo,
      per_page: 100,
    });

    return res.data;
  },

  //Commit 상세조회
  async getCommitDetail(owner: string, repo: string, sha: string, token: string) {
    const octokit = createGitHubClient(token);

    const res = await octokit.request("GET /repos/{owner}/{repo}/commits/{sha}", {
      owner,
      repo,
      sha
    });

    return res.data;
  },
};

