import express from 'express';
import type { Request, Response } from 'express';
import { CarbonFootprint } from '../../models/index.js';
import { authenticateToken } from '../../middleware/auth.js';
import { Op } from 'sequelize';
const router = express.Router();

router.get('/user-progress', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { timeframe = 'month' } = req.query;
        const startDate = new Date();
        
        switch(timeframe) {
            case 'week':
                startDate.setDate(startDate.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            case 'year':
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
        }

        const footprints = await CarbonFootprint.findAll({
            where: {
                user_id: req.user.id,
                date: {
                    [Op.gte]: startDate
                }
            },
            order: [['date', 'ASC']]
        });

        const analysis = {
            totalEmissions: footprints.reduce((sum, fp) => sum + 
                (fp.transportation + fp.home_energy + fp.food + 
                fp.waste + fp.water_usage + fp.consumer_goods + fp.services), 0),
            categoryBreakdown: {
                transportation: footprints.reduce((sum, fp) => sum + fp.transportation, 0),
                homeEnergy: footprints.reduce((sum, fp) => sum + fp.home_energy, 0),
                food: footprints.reduce((sum, fp) => sum + fp.food, 0),
                waste: footprints.reduce((sum, fp) => sum + fp.waste, 0),
                waterUsage: footprints.reduce((sum, fp) => sum + fp.water_usage, 0),
                consumerGoods: footprints.reduce((sum, fp) => sum + fp.consumer_goods, 0),
                services: footprints.reduce((sum, fp) => sum + fp.services, 0)
            },
            trend: footprints.map(fp => ({
                date: fp.date,
                total: fp.transportation + fp.home_energy + fp.food + 
                       fp.waste + fp.water_usage + fp.consumer_goods + fp.services
            }))
        };

        res.json(analysis);
    } catch (error) {
        res.status(500).json({ error: 'Error generating analytics' });
    }
});

export { router as analyticsRouter };
