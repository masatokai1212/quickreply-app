// api/middleware.ts
import { Request, Response, NextFunction } from 'express';
import { MiddlewareConfig } from './types';

const middleware = (config: MiddlewareConfig) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // ミドルウェアのロジック
    next();
  };
};

export default middleware;