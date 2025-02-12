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

/*import { Request, Response, Router } from 'express';

const router = Router();

router.post('/carbon/impact', async (req: Request, res: Response) => {
  try {
    const { electricity, transportation, carType, waterUsage } = req.body;

    // Prepare the data to send to the Climatiq API
    const climatiqData = {
      electricity: electricity, // Use the calculated electricity emission
      transportation: transportation,
      carType: carType,
      waterUsage: waterUsage,
    };

    // Send the request to Climatiq API using fetch
    const response = await fetch('https://api.climatiq.io/your-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_CLIMATIQ_API_KEY`, // Ensure your API key is passed here
      },
      body: JSON.stringify(climatiqData),
    });

    if (!response.ok) {
      throw new Error('Error calculating carbon impact');
    }

    const carbonImpact = await response.json(); // Parse the response as JSON

    // Return the total carbon impact (you can extract other details as needed)
    res.json({ totalEmission: carbonImpact.total_emissions });

  } catch (error: any) {
    console.error('Error in API call:', error);
    res.status(500).json({ error: 'Error calculating carbon impact' });
  }
});

export default router;
 */