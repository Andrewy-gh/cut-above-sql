import { Router } from 'express';
import {
  getAllUsers,
  getAppointments,
  getAppointmentsById,
  createNewUser,
} from './controllers/userController.js';

const router = Router();

router.route('/').get(getAllUsers).post(createNewUser);
// test route
router.route('/:id').get(getAppointments);
router.route('/:id/appointments').get(getAppointmentsById);

export default router;
