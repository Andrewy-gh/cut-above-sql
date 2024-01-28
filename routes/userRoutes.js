import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import {
  getAllUsers,
  getAppointments,
  getAppointmentsById,
  createNewUser,
} from '../controllers/userController.js';
import { paramsSchema } from '../schemas/index.js';

const router = Router();

router.route('/').get(getAllUsers).post(createNewUser);

router.route('/:id/appointments').get(
  celebrate({
    [Segments.PARAMS]: paramsSchema,
  }),
  getAppointmentsById
);

// test routes
router.route('/:id').get(getAppointments);

export default router;
