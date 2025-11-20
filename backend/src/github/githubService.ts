import {
  repoService,
  treeService,
  commitService,
  issueService,
  pullService,
  fileService,
} from "./services";

interface RepoSnapshotParams {
  owner: string;
  repo: string;
  token: string;
  branch?: string;
}

export async function getRepoSnapshot({ owner, repo, token, branch }: RepoSnapshotParams) {
  const repoInfo = await repoService.getRepoInfo(owner, repo, token);
  const targetBranch = branch ?? repoInfo.default_branch ?? "main";
  const tree = await treeService.getRepoTree(owner, repo, targetBranch, token);
  const commits = await commitService.getCommits(owner, repo, token);
  const issues = await issueService.getIssues(owner, repo, token);
  const pulls = await pullService.getPullRequests(owner, repo, token);

  return {
    repoInfo,
    tree,
    commits,
    issues,
    pulls,
  };
}

export const getRepoInfo = repoService.getRepoInfo;
export const getCommits = commitService.getCommits;
export const getIssues = issueService.getIssues;
export const getPullRequests = pullService.getPullRequests;
export const getRepoTree = treeService.getRepoTree;
export const getFileContent = fileService.getFileContent;
