import { Router } from 'express';
import { sendEmail, handleNewMessage } from '../controllers/emailController.js';

const router = Router();

router.route('/').post(sendEmail);
router.route('/new-message').post(handleNewMessage);

export default router;
