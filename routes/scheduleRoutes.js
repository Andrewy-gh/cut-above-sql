import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import {
  getAllSchedules,
  checkScheduleAvailability,
  deleteScheduleById,
  createNewSchedule,
} from '../controllers/scheduleController.js';
import { paramsSchema } from '../schemas/index.js';

const router = Router();

router.route('/').get(getAllSchedules).post(createNewSchedule);
router.route('/:id').delete(
  celebrate({
    [Segments.PARAMS]: paramsSchema,
  }),
  deleteScheduleById
);

// test routes
router.route('/:id/test').get(checkScheduleAvailability);

export default router;
