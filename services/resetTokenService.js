import { PasswordResetToken } from '../models/index.js';
import { Op } from 'sequelize';

export const deleteExpiredTokens = async () => {
  return await PasswordResetToken.destroy({
    where: {
      expiresAt: {
        [Op.lt]: new Date(),
      },
    },
  });
};
