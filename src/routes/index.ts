import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import * as dashboardController from '../controllers/dashboardController';
import authRoutes from './auth';
import activityRoutes from './activities';
import mealRoutes from './meals';
import exchangeRoutes from './exchanges';
import volunteerRoutes from './volunteers';
import complaintRoutes from './complaints';

const router = Router();

router.use('/auth', authRoutes);
router.get('/', requireAuth, dashboardController.overview);
router.use('/activities', activityRoutes);
router.use('/meals', mealRoutes);
router.use('/exchanges', exchangeRoutes);
router.use('/volunteers', volunteerRoutes);
router.use('/complaints', complaintRoutes);

export default router;
