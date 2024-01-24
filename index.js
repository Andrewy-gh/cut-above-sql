import express from 'express';
import usersRouter from './controllers/users.js';
import appointmentsRouter from './controllers/appointments.js';
import { PORT } from './util/config.js';
import { connectToDatabase } from './util/db.js';

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/appointments', appointmentsRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

start();
