import { Appointment, Schedule } from '../models/index.js';
import { checkAvailability } from '../utils/dateTime.js';
import ApiError from '../utils/ApiError.js';
import { convertDate } from '../utils/dateTime.js';

export const getPublicSchedules = async (req, res) => {
  return await Schedule.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: Appointment,
        as: 'appointments',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'clientId', 'scheduleId'],
        },
      },
    ],
  });
};

export const getPrivateSchedules = async (req, res) => {
  await Schedule.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: Appointment,
        as: 'appointments',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'scheduleId'],
        },
        include: [
          {
            model: User.scope('withoutPassword'),
            as: 'client',
            // attributes: {
            //   exclude: ['createdAt', 'updatedAt'],
            // },
          },
          {
            model: User.scope('withoutPassword'),
            as: 'employee',
            // attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
      },
    ],
  });
};

export const checkScheduleAvailability = async (newAppt) => {
  // ! Prev
  // must convert from dayjs obj to iso string for query
  // const date = convertDate(newAppt.date).toISOString();
  // const schedule = await Schedule.findOne({ where: { date } });
  // ! New newAppt.date is already ISO String
  const schedule = await Schedule.findOne({ where: { date: newAppt.date } });
  if (!schedule) {
    throw new ApiError(410, 'Schedule not available');
  }
  // TODO: Eager load appointments
  const appointments = await schedule.getAppointments();
  // TODO: check before open or check after close too
  const available = checkAvailability(appointments, newAppt);
  if (!available) {
    throw new ApiError(410, 'Appointment not available'); // Gone
  }
  return schedule.id;
};
