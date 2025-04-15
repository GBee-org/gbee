import jwt from 'jsonwebtoken';
import { Role, User } from '../models';
import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Access Denied' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'mySuperSecret123';
    const payload = jwt.verify(token, secret) as User;
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid Token' });
    return;
  }
};

export const authorize =
  (roles: Role[] = []) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

      if (roles.length && !roles.includes(decoded.role)) {
        res.status(403).json({ message: 'Access denied' });
        return;
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
  };
