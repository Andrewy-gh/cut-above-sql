import { Router } from 'express';
import {
  getAllAppointments,
  testRequestValidation,
  bookAppointment,
  modifyAppointment,
  testAppointmentUpdate,
  deleteAppointmentById,
} from '../controllers/appointmentController.js';

const router = Router();

router
  .route('/')
  .get(getAllAppointments)
  .post(bookAppointment)
  .delete(deleteAppointmentById);

router.route('/:id').get(modifyAppointment);

// test routes
router.route('/test').post(testRequestValidation);
router.route('/:id/test').get(testAppointmentUpdate);

export default router;
