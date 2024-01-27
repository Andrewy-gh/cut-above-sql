import { Router } from 'express';
import usersRouter from './contrllers.userController.js';
import appointmentsRouter from './appointments.js';
import schedulesRouter from './schedules.js';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/appointments', appointmentsRouter);
router.use('/api/schedules', schedulesRouter);

export default router;
