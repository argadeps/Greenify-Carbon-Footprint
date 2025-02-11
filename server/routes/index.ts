import { Router } from 'express';
import activityRouter from './activity/index.js';
import userRouter from './user/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();


router.use('/activity', activityRouter);
router.use('/user', authenticateToken, userRouter);
/*router.get('/', async (_req: Request, res: Response) => {
    if(_req) {
        res.status(200).json({message: " it's working!!"})
    }
    else {
        res.status(400).json({message: 'bad message'});
    }
  });*/


export default router;