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
  username: Joi.string().required(),
  email: Joi.string().email().required(),
});
router.route('/test').post(validateRequest(schema), testUserSchema);

export default router;
