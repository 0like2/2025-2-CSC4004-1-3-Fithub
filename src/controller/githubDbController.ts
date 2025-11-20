import { Request, Response, NextFunction } from "express";
import { dbService } from "../github/services/dbService";

export const githubDbController = {

  //repository
  async getRepo(req: Request, res: Response, next: NextFunction) {
    try {
      const { repoId } = req.params;
      const repo = await dbService.getRepo(repoId);

      if (!repo) {
        return res.status(404).json({ message: "Repository not found" });
      }

      return res.json(repo);
    } catch (error) {
      next(error);
    }
  },

  //file
  async getRepoFiles(req: Request, res: Response, next: NextFunction) {
    try {
      const { repoId } = req.params;
      const files = await dbService.getRepoFiles(repoId);
      return res.json(files);
    } catch (error) {
      next(error);
    }
  },

  async getFileDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const { repoId, fileId } = req.params;
      const file = await dbService.getFileDetail(repoId, fileId);

      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }

      return res.json(file);
    } catch (error) {
      next(error);
    }
  },

  async getRepoFileTree(req: Request, res: Response, next: NextFunction) {
  try {
    const { repoId } = req.params;
    const files = await dbService.getRepoFiles(repoId);
    const tree: any = {};

    for (const file of files) {
      const parts = file.path.split("/"); // ["src", "components", "Header.tsx"]

      let current = tree;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
    }

    return res.json(tree);
    } catch (error) {
    next(error);
    }
  },

  //commits
  async getRepoCommits(req: Request, res: Response, next: NextFunction) {
    try {
      const { repoId } = req.params;
      const commits = await dbService.getRepoCommits(repoId);
      return res.json(commits);
    } catch (error) {
      next(error);
    }
  },

  async getCommitDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const { repoId, sha } = req.params;
      const commit = await dbService.getCommitDetail(repoId, sha);

      if (!commit) {
        return res.status(404).json({ message: "Commit not found" });
      }

      return res.json(commit);
    } catch (error) {
      next(error);
    }
  },

  //issues
  async getRepoIssues(req: Request, res: Response, next: NextFunction) {
    try {
      const { repoId } = req.params;
      const issues = await dbService.getRepoIssues(repoId);
      return res.json(issues);
    } catch (error) {
      next(error);
    }
  },

  async getIssueDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const { repoId, issueId } = req.params;
      const issue = await dbService.getIssueDetail(repoId, issueId);

      if (!issue) {
        return res.status(404).json({ message: "Issue not found" });
      }

      return res.json(issue);
    } catch (error) {
      next(error);
    }
  },

  //pull requests
  async getRepoPulls(req: Request, res: Response, next: NextFunction) {
    try {
      const { repoId } = req.params;
      const pulls = await dbService.getRepoPulls(repoId);
      return res.json(pulls);
    } catch (error) {
      next(error);
    }
  },

  async getPullDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const { repoId, pullId } = req.params;
      const pull = await dbService.getPullDetail(repoId, pullId);

      if (!pull) {
        return res.status(404).json({ message: "Pull request not found" });
      }

      return res.json(pull);
    } catch (error) {
      next(error);
    }
  },
};
