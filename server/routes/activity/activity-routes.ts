import express from 'express';
import type { Request, Response } from 'express';
import { EmissionFactor } from '../../models/index.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', async (_req: Request, res: Response) => {
    try {
      const users = await EmissionFactor.findAll({
        attributes: { exclude: ['password_hash'] }
      });
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await EmissionFactor.findByPk(id, {
        attributes: { exclude: ['password_hash'] }
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/', async (_req: Request, res: Response) => {
    const {activity_id, category, display_name, source, region, year, source_lca_activity, data_version} = _req.body;
    try {
      const users = await EmissionFactor.findAll({
        attributes: { exclude: ['password_hash'] }
      });
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  export { router as activityRouter };
  