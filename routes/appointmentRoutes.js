import { Router } from 'express';
import {
  getAllAppointments,
  testRequestValidation,
  bookAppointment,
  modifyAppointment,
  testAppointmentUpdate,
  deleteAppointmentById,
} from '../controllers/appointmentController.js';
import { bodySchema, paramsSchema } from '../schemas/index.js';
import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

router
  .route('/')
  .get(getAllAppointments)
  .post(
    celebrate({
      [Segments.BODY]: bodySchema,
    }),
    bookAppointment
  )
  .delete(deleteAppointmentById);

router.route('/:id').put(
  celebrate(
    {
      [Segments.BODY]: bodySchema,
      [Segments.PARAMS]: paramsSchema,
    },
    { abortEarly: false, warnings: true },
    // https://github.com/arb/celebrate#modes - validates the entire request object and collects all the validation failures in the result.
    { mode: 'full' }
  ),
  modifyAppointment
);

// test routes
router.route('/test').post(testRequestValidation);
router.route('/:id/test').get(testAppointmentUpdate);

export default router;
