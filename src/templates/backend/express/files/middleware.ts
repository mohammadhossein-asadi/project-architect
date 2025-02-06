export const getMiddlewareFiles = () => [
  {
    path: 'src/middleware/auth.ts',
    content: `import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // Authentication logic here
  next();
};`
  }
];