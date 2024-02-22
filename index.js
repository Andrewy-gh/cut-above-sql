import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import 'express-async-errors';
import { PORT } from './utils/config.js';
import { connectToDatabase } from './utils/db.js';
import router from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import logger from './utils/logger/index.js';
import session from './middlewares/session.js';
import cors from './middlewares/cors.js';
import cronJob from './utils/cronJob.js';
import { listenForMessage } from './services/emailService.js';

const app = express();

app.use(helmet());
app.use(bodyParser.json());

// setup CORS logic
app.options('*', cors);
app.use(cors);

app.use(session);

cronJob();
listenForMessage();

// routes
app.use(router);

// error handler middleware
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    logger.info(`Server running on ${PORT}`);
  });
};

start();
