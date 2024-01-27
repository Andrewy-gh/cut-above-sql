import { Router } from 'express';
import { Schedule, Appointment, User } from '../models/index.js';
import { checkAvailability } from '../utils/dateTime.js';

const router = Router();

router.get('/', async (req, res) => {
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
            model: User,
            as: 'client',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          {
            model: User,
            as: 'employee',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
      },
    ],
  });
  res.json(schedules);
});

router.get('/:id/test', async (req, res) => {
  const newAppt = {
    date: '2024-01-25',
    startTime: '17:00:00',
    endTime: '17:30:00',
    clientId: '96b0cfd3-8c5f-4bb7-8946-c550e1e36f99',
    employeeId: '6383181b-e1e5-4931-a43f-090eccd9f7e7',
  };
  const schedule = await Schedule.findByPk(req.params.id);
  const appointments = await schedule.getAppointments();

  const isAvailable = checkAvailability(appointments, newAppt);
  res.json(isAvailable);
});

router.delete('/:id', async (req, res) => {
  const schedule = await Schedule.findByPk(req.params.id);
  await schedule.destroy();
  res.status(200).end();
});

export default router;
