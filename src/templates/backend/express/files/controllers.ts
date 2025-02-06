export const getControllerFiles = () => [
  {
    path: 'src/controllers/userController.ts',
    content: `import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
  res.send('Get all users');
};`
  }
];