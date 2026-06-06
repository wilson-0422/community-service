import { Router } from 'express';
import * as mealController from '../controllers/mealController';
import { requireAuth, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, mealController.list);
router.get('/order', requireAuth, mealController.showOrder);
router.post('/order', requireAuth, mealController.createOrder);
router.get('/orders', requireAuth, mealController.myOrders);
router.post('/:id/cancel', requireAuth, mealController.cancelOrder);
router.post('/:id/status', requireAdmin, mealController.updateStatus);

export default router;
