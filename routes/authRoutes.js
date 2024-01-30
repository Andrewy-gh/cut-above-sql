import { Router } from 'express';
import authenticateUser from '../middlewares/authenticateUser.js';
import { login, getAccount } from '../controllers/authController.js';

const router = Router();

// TODO: add validation
router.route('/login').post(login);
router.route('/account').get(authenticateUser, getAccount);

export default router;
