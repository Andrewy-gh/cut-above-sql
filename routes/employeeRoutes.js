import { Router } from 'express';
import { getAllEmployees } from '../controllers/employeeController.js';

const router = Router();

router.route('/').get(getAllEmployees);

export default router;
