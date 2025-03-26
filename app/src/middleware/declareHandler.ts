import { User } from '../models';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export function declareHandler(req: Request, res: Response, next: NextFunction) {
  req.user;
  next();
}
