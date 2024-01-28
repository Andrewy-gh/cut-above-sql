import { users, appointments } from './data.js';
import { Appointment, User } from '../models/index.js';
import logger from './logger/index.js';

export const seedData = async () => {
  const newUsers = await User.bulkCreate(users);
  logger.info('new users created');
  logger.info(JSON.stringify(newUsers));
};

seedData();
