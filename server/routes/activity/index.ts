import { Router } from 'express';
import { activityRouter } from './activity-routes.js';

const router = Router();

router.use('/factor', activityRouter);

export default router;
