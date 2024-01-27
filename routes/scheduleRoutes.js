import { Router } from 'express';
import {
  getAllSchedules,
  checkScheduleAvailability,
  deleteScheduleById,
} from './controllers/schedulesController.js';

const router = Router();

router.route('/').get(getAllSchedules);
router.route('/:id').delete(deleteScheduleById);

// test routes
router.route('/:id/test').get(checkScheduleAvailability);

export default router;
