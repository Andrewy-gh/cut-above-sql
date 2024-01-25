import { Router } from 'express';
import { Schedule, Appointment, User } from '../models/index.js';

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

router.delete('/:id', async (req, res) => {
  const schedule = await Schedule.findByPk(req.params.id);
  await schedule.destroy();
  res.status(200).end();
});

export default router;
