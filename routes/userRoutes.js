import { Router } from 'express';
import {
  getAllUsers,
  getAppointments,
  getAppointmentsById,
  createNewUser,
} from './controllers/userController.js';

const router = Router();

router.route('/').get(getAllUsers).post(createNewUser);

router.route('/:id/appointments').get(getAppointmentsById);

// test route
router.route('/:id').get(getAppointments);

export default router;
