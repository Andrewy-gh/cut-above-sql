import logger from '../utils/logger/index.js';
import { authenticateUser } from '../services/authService.js';

/**
 * @description login user
 * @route /login
 * @method POST
 * @returns {Response | Error} 204 for successful response
 */
export const login = async (req, res) => {
  const user = await authenticateUser(req.body);
  req.session.user = user;
  res.status(204).end();
};

/**
 * @description get account details from session
 * @route /account
 * @method GET
 * @returns {Session}
 */
export const getAccount = async (req, res) => {
  res.json(req.session);
};

/**
 * @description login user
 * @route /login
 * @method POST
 * @returns {Response | Error} 204 for successful response
 */
export const logout = async (req, res) => {
  console.log('received');
  const { user } = req.session;
  req.session.destroy((err) => {
    if (err) {
      logger.error('Error performing logout:');
      logger.error(err);
    } else if (user) {
      logger.info(`Logged out user ${user.email}.`);
    } else {
      logger.info('Logout called by a user without a session.');
    }
  });
  res.clearCookie('cutabove', {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // if true: only transmit cookie over https, in prod, always activate this
  });
  res.status(204).end();
};
