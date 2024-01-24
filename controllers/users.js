import { Router } from 'express';
import { User, Appointment } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Appointment,
        as: 'appointments', // The alias you defined in the association
        include: {
          model: User,
          as: 'employee',
        },
      },
    ],
  });
  res.json(user);
});

router.get('/:id/appointments', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const clientAppointments = await user.getAppointments({
    include: [
      {
        model: User,
        as: 'employee',
      },
    ],
  });
  res.json(clientAppointments);
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
