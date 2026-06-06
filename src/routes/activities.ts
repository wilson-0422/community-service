import { Router } from 'express';
import * as activityController from '../controllers/activityController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, activityController.list);
router.get('/create', requireAuth, activityController.showCreate);
router.post('/create', requireAuth, activityController.create);
router.get('/:id', requireAuth, activityController.detail);
router.post('/:id/register', requireAuth, activityController.registerActivity);
router.post('/:id/cancel', requireAuth, activityController.cancelRegistration);

export default router;
