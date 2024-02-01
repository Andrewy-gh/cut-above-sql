import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import {
  getAllAppointments,
  bookAppointment,
  modifyAppointment,
  testAppointmentUpdate,
  deleteAppointmentById,
  testBookingAppontment,
} from '../controllers/appointmentController.js';
import { bodySchema, paramsSchema } from '../schemas/index.js';
import authenticateUser from '../middlewares/authenticateUser.js';

const router = Router();

router
  .route('/')
  .get(getAllAppointments)
  .post(
    celebrate(
      {
        [Segments.BODY]: bodySchema,
      },
      // https://github.com/arb/celebrate#celebrateschema-joioptions-opts
      // https://github.com/hapijs/joi/blob/master/API.md#anyvalidatevalue-options
      // https://joi.dev/api/?v=17.12.0#date
      //  If the validation convert option is on (enabled by default), a string or number will be converted to a Date if specified.
      { convert: false }
    ),
    authenticateUser,
    bookAppointment
  );

router
  .route('/:id')
  .put(
    celebrate(
      {
        [Segments.BODY]: bodySchema,
        [Segments.PARAMS]: paramsSchema,
      },
      { abortEarly: false, warnings: true, convert: false },
      // https://github.com/arb/celebrate#modes - validates the entire request object and collects all the validation failures in the result.
      { mode: 'full' }
    ),
    modifyAppointment
  )
  .delete(
    celebrate({ [Segments.PARAMS]: paramsSchema }),
    deleteAppointmentById
  );

// test routes
router.route('/test').post(testBookingAppontment);
router.route('/:id/test').get(testAppointmentUpdate);

export default router;
