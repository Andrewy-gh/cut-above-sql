import { Router } from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import {
  login,
  getCurrentUser,
  logout,
  register,
} from '../controllers/authController.js';

const router = Router();

// TODO: add validation
router.route('/login').post(login);
router.route('/current-user').get(authenticateUser, getCurrentUser);
router.route('/logout').get(logout);
router.route('/signup').post(register);

export default router;
