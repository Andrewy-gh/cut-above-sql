import express from 'express';
import { PORT } from './utils/config.js';
import { connectToDatabase } from './utils/db.js';
import router from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

// routes
app.use('/', router);

// error handler middleware
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

start();
