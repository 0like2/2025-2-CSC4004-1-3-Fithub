import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../jwt";

export interface AuthRequest extends Request {
  user?: { id: number };
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Missing or invalid Authorization header",
    });
  }

  const token = authHeader.substring("Bearer ".length);

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.userId };
    next();
  } catch (err) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};
