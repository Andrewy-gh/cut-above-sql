import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import { updateEmail } from '../services/accountService.js';

/**
 * @description change email
 * @route /api/account/email
 * @method POST
 */
export const changeEmail = async (req, res) => {
  const user = await updateEmail({
    email: req.body.email,
    id: req.session.user.id,
  });
  req.session.user = user;
  res.status(200).json({
    success: true,
    message: 'User email successfully changed',
    user: user,
  });
};

/**
 * @description change password
 * @route /api/account/password
 * @method POST
 */
export const changePassword = async (req, res) => {
  const { password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  await User.update({ passwordHash }, { where: { id: req.session.user.id } });
  res
    .status(200)
    .json({ success: true, message: 'User password successfully changed' });
};
