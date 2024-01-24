import { Router } from 'express';
import { Appointment } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  const appointments = await Appointment.findAll();
  res.json(appointments);
});

router.post('/', async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    console.log('appointment: ', appointment);
    res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
