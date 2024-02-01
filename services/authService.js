import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

export const authenticateUser = async (credentials) => {
  const user = await User.scope('withPassword').findOne({
    where: { email: credentials.email },
  });
  if (!user) {
    throw new ApiError(401, 'Unauthorized');
  }
  const match = await bcrypt.compare(credentials.password, user.passwordHash);
  if (!match) {
    throw new ApiError(401, 'Unauthorized');
  }
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
};
