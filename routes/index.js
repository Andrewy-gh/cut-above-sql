import { Router } from 'express';
import userRoutes from './userRoutes.js';
import appointmentRoutes from './appointmentRoutes.js';
import schedulesRoutes from './scheduleRoutes.js';

const router = Router();

router.use('/api/users', userRoutes);
router.use('/api/appointments', appointmentRoutes);
router.use('/api/schedules', schedulesRoutes);

export default router;
