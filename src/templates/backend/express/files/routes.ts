export const getRouteFiles = () => [
  {
    path: 'src/routes/index.ts',
    content: `import { Router } from 'express';
import { userRoutes } from './user';

const router = Router();

router.use('/users', userRoutes);

export default router;`
  }
];