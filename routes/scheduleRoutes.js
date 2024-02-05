import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import {
  getAllSchedules,
  checkScheduleAvailability,
  deleteScheduleById,
  createNewSchedule,
} from '../controllers/scheduleController.js';
import { paramsSchema } from '../schemas/index.js';
import {
  authenticateUser,
  authenticateRole,
} from '../middlewares/authenticateUser.js';

const router = Router();

router
  .route('/')
  .get(authenticateUser, authenticateRole, getAllSchedules)
  .post(authenticateUser, authenticateRole, createNewSchedule);
router.route('/:id').delete(
  celebrate({
    [Segments.PARAMS]: paramsSchema,
  }),
  authenticateUser,
  authenticateRole,
  deleteScheduleById
);

// test routes
router.route('/:id/test').get(checkScheduleAvailability);

export default router;
