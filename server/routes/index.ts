import { Request, Response, Router} from 'express';
//import authRoutes from './auth-routes.js';
//import apiRoutes from './api/index.js';
//import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
      res.json({message: "working"});
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  });

//router.use('/auth', authRoutes);
//router.use('/api', authenticateToken, apiRoutes);

export default router;