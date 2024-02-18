import logger from '../utils/logger/index.js';
import {
  authenticateUser,
  registerUser,
  resetPassword,
  validateToken,
} from '../services/authService.js';

/**
 * @description register user
 * @route /signup
 * @method POST
 * @returns {Response | Error} 204 for successful response
 */
export const register = async (req, res) => {
  await registerUser(req.body);
  res
    .status(200)
    .json({ success: true, message: 'Successfully registered account' });
};

/**
 * @description login user
 * @route /login
 * @method POST
 * @returns {Response | Error} 204 for successful response
 */
export const login = async (req, res) => {
  const user = await authenticateUser(req.body);
  req.session.user = user;
  res
    .status(200)
    .json({ success: true, message: 'Successfully logged in', user: user });
};

/**
 * @description login user
 * @route /login
 * @method POST
 * @returns {Response | Error} 204 for successful response
 */
export const logout = async (req, res) => {
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

/**
 * @description endpoint for token validation
 * @route /validation/:id/:token
 * @method GET
 */
export const handleTokenValidation = async (req, res) => {
  await validateToken(req.params);
  res.json({ success: true, message: 'Token is valid' });
};

/**
 * @description reset password after token is validated
 * @route /reset-pw/:id/:token
 * @method PUT
 */
export const handlePasswordReset = async (req, res) => {
  await resetPassword({ id: req.params.id, newPassword: req.body.newPassword });
  res.status(200).json({ success: true, message: 'Password updated' });
};
