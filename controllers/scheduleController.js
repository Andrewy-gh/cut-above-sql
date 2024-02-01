import { Schedule, Appointment, User } from '../models/index.js';
import { checkAvailability, generateRange } from '../utils/dateTime.js';

/**
 * @description retrieve all schedules
 * @route /api/schedules
 * @method GET
 * @returns {Schedule[]}, array of Schedule objects
 */
export const getAllSchedules = async (req, res) => {
  const schedules = await Schedule.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: Appointment,
        as: 'appointments',
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'clientId',
            'employeeId',
            'scheduleId',
          ],
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
  res.json(schedules);
};

/**
 * @description create a single or multiple schedules
 * @route /api/schedules
 * @method POST
 * @returns {Schedule | Schedule[]}, array of Schedule objects
 */
export const createNewSchedule = async (req, res) => {
  const { dates, open, close } = req.body;
  const dateRangeToSchedule = generateRange(dates, open, close);
  const newSchedules = dateRangeToSchedule.map((s) => {
    return Schedule.findOrCreate({
      where: { date: s.date },
      defaults: {
        open: s.open,
        close: s.close,
      },
    });
  });
  const savedSchedules = await Promise.all(newSchedules);
  res.status(201).json({
    success: true,
    message: 'New schedule added',
    data: savedSchedules,
  });
};

/**
 * @description function to test schedule availability
 * @route /api/schedules/:id/test
 * @method GET
 * @returns {Boolean},
 */
export const checkScheduleAvailability = async (req, res) => {
  const newAppt = {
    date: '2024-01-25',
    start: '17:00:00',
    end: '17:30:00',
    clientId: '96b0cfd3-8c5f-4bb7-8946-c550e1e36f99',
    employeeId: '6383181b-e1e5-4931-a43f-090eccd9f7e7',
  };
  const schedule = await Schedule.findByPk(req.params.id);
  const appointments = await schedule.getAppointments();

  const isAvailable = checkAvailability(appointments, newAppt);
  res.json(isAvailable);
};

/**
 * @description function to test schedule availability
 * @route /api/schedules/:id
 * @method DELETE
 * @returns {Response}, 200 OK
 */
export const deleteScheduleById = async (req, res) => {
  const schedule = await Schedule.findByPk(req.params.id);
  await schedule.destroy();
  res.status(200).end();
};
