import { Router } from 'express';
import * as complaintController from '../controllers/complaintController';
import { requireAuth, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, complaintController.list);
router.get('/create', requireAuth, complaintController.showCreate);
router.post('/create', requireAuth, complaintController.create);
router.get('/:id', requireAuth, complaintController.detail);
router.post('/:id/status', requireAdmin, complaintController.updateStatus);
router.post('/:id/reply', requireAdmin, complaintController.reply);

export default router;
