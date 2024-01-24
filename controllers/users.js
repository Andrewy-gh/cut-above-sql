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
      },
    ],
  });
  res.json(user);
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
