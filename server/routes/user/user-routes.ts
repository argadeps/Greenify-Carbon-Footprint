import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', async (_req: Request, res: Response) => {
    try {
      const users = await User.findAll({
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
      const user = await User.findByPk(id, {
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

  router.post('/users/register', async (req: Request, res: Response) => {
    try {
        const { username, email, password} = req.body;
        
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const user = await User.create({
            username,
            email,
            password: password,
                  
              });

        
            return res.status(201).json({ message: 'User created successfully', userId: user.id });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating user' });
    }
});

  export { router as userRouter };
  