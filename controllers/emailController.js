import { pub } from '../utils/redis.js';

/**
 * @description send a test email
 * @route /api/emails
 * @method POST
 * @returns {Response}
 */
export const sendEmail = async (req, res) => {
  const obj = ['randomValue', Math.random()];
  await pub.xadd('email-stream', 'MAXLEN', '3', '*', obj);
  res.json({ success: true, message: 'email sent' });
};
