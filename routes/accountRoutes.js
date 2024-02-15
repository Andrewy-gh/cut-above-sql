import { Router } from 'express';
import {
  changeEmail,
  changePassword,
} from '../controllers/accountController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';

const router = Router();

// validate body
router.route('/email').put(authenticateUser, changeEmail);
router.route('/password').put(authenticateUser, changePassword);

export default router;
