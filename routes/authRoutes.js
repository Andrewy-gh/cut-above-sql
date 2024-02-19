import { Router } from 'express';
import {
  login,
  logout,
  register,
  handleTokenValidation,
  handlePasswordReset,
  changeEmail,
  changePassword,
} from '../controllers/authController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import validateToken from '../middlewares/validateToken.js';

const router = Router();

// TODO: add validation
router.route('/login').post(login);
router.route('/logout').get(authenticateUser, logout);
router.route('/signup').post(register);
router.route('/email').put(authenticateUser, changeEmail);
router.route('/password').put(authenticateUser, changePassword);
router.route('/validation/:id/:token').get(handleTokenValidation);
router.route('/reset-pw/:id/:token').put(validateToken, handlePasswordReset);

export default router;
