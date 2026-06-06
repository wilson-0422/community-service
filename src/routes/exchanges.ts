import { Router } from 'express';
import * as exchangeController from '../controllers/exchangeController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, exchangeController.list);
router.get('/create', requireAuth, exchangeController.showCreate);
router.post('/create', requireAuth, exchangeController.create);
router.get('/:id', requireAuth, exchangeController.detail);
router.post('/:id/exchange', requireAuth, exchangeController.markExchanged);
router.post('/:id/remove', requireAuth, exchangeController.remove);

export default router;
