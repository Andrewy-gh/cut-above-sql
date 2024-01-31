import { Router } from 'express';
import userRoutes from './userRoutes.js';
import appointmentRoutes from './appointmentRoutes.js';
import schedulesRoutes from './scheduleRoutes.js';
import authRoutes from './authRoutes.js';
import employeeRoutes from './employeeRoutes.js';

const router = Router();

router.use('/api/users', userRoutes);
router.use('/api/appointments', appointmentRoutes);
router.use('/api/schedules', schedulesRoutes);
router.use(authRoutes);
router.use('/api/employees', employeeRoutes);

export default router;
