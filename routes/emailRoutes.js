import { Router } from 'express';
import {
  sendEmail,
  handleNewMessage,
  sendPasswordReset,
} from '../controllers/emailController.js';

const router = Router();

router.route('/').post(sendEmail);
router.route('/new-message').post(handleNewMessage);
router.route('/reset-pw').post(sendPasswordReset);

export default router;
