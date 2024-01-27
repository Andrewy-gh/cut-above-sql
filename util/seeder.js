import { users, appointments } from './data.js';
import { Appointment, User } from '../models/index.js';

export const seedData = async () => {
  const newUsers = await User.bulkCreate(users);
  console.log(JSON.stringify(newUsers));
};

seedData();
