import { publishMessage } from '../services/emailService.js';

/**
 * @description send a test email
 * @route /api/emails
 * @method POST
 * @returns {Response}
 */

export const sendEmail = async (req, res) => {
  await publishMessage(req.body);
  res.json({ success: true, message: 'email sent' });
};
