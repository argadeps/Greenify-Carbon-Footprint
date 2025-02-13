import { Router } from 'express';
import { analyticsRouter } from './analytics-routes.js';

const router = Router();

router.use('/analytics', analyticsRouter);

export default router;
