import { Router } from 'express';
import * as volunteerController from '../controllers/volunteerController';
import { requireAuth, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, volunteerController.schedule);
router.get('/:id', requireAuth, volunteerController.showSignup);
router.post('/:id/signup', requireAuth, volunteerController.signup);
router.post('/:id/cancel', requireAuth, volunteerController.cancelSignup);
router.post('/create', requireAdmin, volunteerController.createShift);

export default router;
