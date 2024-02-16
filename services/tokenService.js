import crypto from 'crypto';
import { CLIENT_URL } from '../utils/config.js';
import { PasswordResetToken } from '../models/index.js';

const storeToken = async (email, token) =>
  await PasswordResetToken.create({ email, tokenHash: token });

const checkForExistingToken = async (email) => {
  const existingToken = await PasswordResetToken.findOne({ where: { email } });
  if (existingToken) {
    await existingToken.destroy();
  }
};

export const generateTokenLink = async (email) => {
  await checkForExistingToken(email);
  const token = crypto.randomBytes(32).toString('hex'); // Generate random token
  await storeToken(email, token);
  const resetUrl = `${CLIENT_URL}/resetpw/${email}/${token}`;
  return resetUrl;
};
