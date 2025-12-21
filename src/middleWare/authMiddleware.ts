import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/token";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userEmail?: string;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token не доступен!",
      });
    }

    const token: any = authHeader.split(" ")[1];
    const decoded = verifyToken(token) as { userId: string; userEmail: string };

    req.userId = decoded.userId;
    req.userEmail = decoded.userEmail;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Неверный или отсутствующий токен",
    });
  }
};

export default authMiddleware;
