import { Router } from 'express';
import { User, Appointment } from '../models/index.js';
import { getAppointmentsByRole } from '../services/userService.js';

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
        as: 'employeeAppointments', // The alias you defined in the association
        include: {
          model: User,
          as: 'client',
        },
      },
    ],
  });
  res.json(user);
});

router.get('/:id/appointments', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const appointments = await getAppointmentsByRole(user);
    res.json(appointments);
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
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
