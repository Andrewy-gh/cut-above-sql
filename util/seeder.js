import { users, appointments } from './data.js';
import { Appointment, User } from '../models/index.js';
import { connectToDatabase } from './db.js';

export const seedData = async () => {
  await connectToDatabase();
  const newUsers = await User.bulkCreate(users);
  console.log(JSON.stringify(newUsers));
  const sampleAppointments = appointments.map((appointment, index) => {
    return { ...appointment, clientId: index, employeeId: index + 4 };
  });
  const newAppointments = await Appointment.bulkCreate(sampleAppointments);
  console.log(JSON.stringify(newAppointments));
};
