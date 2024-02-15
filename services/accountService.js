import { User } from '../models/index.js';

export const updateEmail = async (user) => {
  const currentUser = await User.findByPk(user.id);
  currentUser.email = user.email;
  await currentUser.save();
  return {
    id: currentUser.id,
    email: currentUser.email,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    role: currentUser.role,
  };
};
