import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import {
  getAllSchedulesPublic,
  getAllSchedulesPrivate,
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
  .get(getAllSchedulesPublic)
  .post(authenticateUser, authenticateRole, createNewSchedule);

router.route('/:id').delete(
  celebrate({
    [Segments.PARAMS]: paramsSchema,
  }),
  authenticateUser,
  authenticateRole,
  deleteScheduleById
);

router
  .route('/dashboard')
  .get(authenticateUser, authenticateRole, getAllSchedulesPrivate);

// test routes
router.route('/:id/test').get(checkScheduleAvailability);

export default router;
