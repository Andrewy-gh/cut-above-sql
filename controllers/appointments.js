import { Router } from 'express';
import { Appointment, Schedule } from '../models/index.js';
import { validateNewRequest } from '../util/validation.js';

const router = Router();

router.get('/', async (req, res) => {
  const appointments = await Appointment.findAll();
  res.json(appointments);
});

// req.body from client:
// {
//   date: '2024-02-02',
//   start: '17:30',
//   end: '18:00',
//   service: 'Haircut',
//   employee: '64a60e878bdf8a4ac0f98209'
// }
router.post('/test', async (req, res) => {
  try {
    const isValidReq = await validateNewRequest(req.body);
    res.json(isValidReq);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

router.post('/', async (req, res) => {
  try {
    const [schedule] = await Schedule.findOrCreate({
      where: { date: req.body.date },
    });
    const appointment = await Appointment.create({
      ...req.body,
      scheduleId: schedule.id,
    });
    res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'appointment not found' });
    }
    // date has been changed
    if (req.body.date && req.body.date !== appointment.date) {
      const schedule = await appointment.getSchedule();
      await schedule.removeAppointment(appointment);
      const [newSchedule] = await Schedule.findOrCreate({
        where: { date: req.body.date },
      });
      await appointment.update({
        date: req.body.date,
        scheduleId: newSchedule.id,
      });
    } else {
      await appointment.update(req.body);
    }
    res.json(appointment);
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ error: 'Error updating appointment' });
  }
});

router.delete('/:id', async (req, res) => {
  const appointment = await Appointment.findByPk(req.params.id);
  await appointment.destroy();
  res.status(200).end();
});

export default router;
