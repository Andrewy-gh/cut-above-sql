import { Router } from 'express';
import {
  getAllUsers,
  getAppointments,
  getAppointmentsById,
  createNewUser,
  testUserSchema,
} from '../controllers/userController.js';
import validateRequest from '../middlewares/validateRequest.js';
import Joi from 'joi';

const router = Router();

router.route('/').get(getAllUsers).post(createNewUser);

router.route('/:id/appointments').get(getAppointmentsById);

// test route
router.route('/:id').get(getAppointments);

const schema = Joi.object({
  date: Joi.string().isoDate().required(),
  startTime: Joi.string()
    .regex(/^\d{2}:\d{2}$/)
    .required(),
  endTime: Joi.string()
    .regex(/^\d{2}:\d{2}$/)
    .required(),
  clientId: Joi.string().guid().required(),
  employeeId: Joi.string().guid().required(),
  service: Joi.string().required(),
});
router.route('/test').post(validateRequest(schema), testUserSchema);

export default router;
