import { Request, Response, NextFunction } from 'express';

// Extend the session type for TypeScript
declare module 'express-session' {
  interface SessionData {
    userId: number;
    role: string;
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session || !req.session.userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  next(); // Call next only if authenticated
};
