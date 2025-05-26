import { Request, Response, NextFunction } from 'express';

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session?.role !== 'admin') {
    res.status(403).json({ message: 'Forbidden: Admins only' });
    return;
  }
  next();
};
