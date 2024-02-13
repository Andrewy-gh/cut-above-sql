import { publishMessage } from '../services/emailService.js';
import { EMAIL_USER } from '../utils/config.js';

/**
 * @description send a test email
 * @route /api/email
 * @method POST
 * @returns {Response}
 */
export const sendEmail = async (req, res) => {
  await publishMessage(req.body);
  res.json({ success: true, message: 'email sent' });
};

/**
 * @description send an email to acknowledge message received
 * @route /api/email
 * @method POST
 * @returns {Response}
 */
export const handleNewMessage = async (req, res) => {
  const { contactDetails } = req.body;
  await publishMessage({
    receiver: contactDetails.email,
    option: 'message auto reply',
  });
  // Error: Message failed: 432 4.3.2 Concurrent connections limit exceeded.
  setTimeout(async () => {
    await publishMessage({
      receiver: EMAIL_USER,
      option: 'message submission',
      contactDetails,
    });
  }, 3000);
  res.status(200).json({
    success: true,
    message:
      'Message has been received. You can expect a response in a timely manner.',
  });
};
