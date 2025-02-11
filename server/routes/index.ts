import { Router, Response, Request } from 'express';
//import authRoutes from './auth-routes.js';
//import apiRoutes from './api/index.js';
//import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    if(_req) {
        res.status(200).json({message: " it's working!!"})
    }
    else {
        res.status(400).json({message: 'bad message'});
    }
  });


export default router;