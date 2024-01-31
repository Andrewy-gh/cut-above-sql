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
