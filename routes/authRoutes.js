import { Router } from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import {
  login,
  getCurrentUser,
  logout,
  register,
  handleTokenValidation,
  handlePasswordReset,
} from '../controllers/authController.js';
import validateToken from '../middlewares/validateToken.js';

const router = Router();

// TODO: add validation
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/signup').post(register);
router.route('/validation/:id/:token').get(handleTokenValidation);
router.route('/reset-pw/:id/:token').put(validateToken, handlePasswordReset);

export default router;
