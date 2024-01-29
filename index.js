import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import 'express-async-errors';
import { PORT } from './utils/config.js';
import { connectToDatabase } from './utils/db.js';
import router from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import logger from './utils/logger/index.js';

import session from 'express-session';
import { Redis } from 'ioredis';
import {
  REDIS_PORT,
  REDIS_HOST,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  SESSION_SECRET,
} from './utils/config.js';

import RedisStore from 'connect-redis';

const app = express();

app.use(helmet());
app.use(bodyParser.json());

const redisClient = new Redis({
  port: REDIS_PORT, // Redis port
  host: REDIS_HOST, // Redis host
  username: REDIS_USERNAME, // needs Redis >= 6
  password: REDIS_PASSWORD,
  db: 0, // Defaults to 0
});

const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'cutabove:',
});

app.use(
  session({
    store: redisStore,
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    name: 'sessionId',
    cookie: {
      secure: false, // if true: only transmit cookie over https, in prod, always activate this
      httpOnly: true, // if true: prevents client side JS from reading the cookie
      maxAge: 1000 * 60 * 30, // session max age in milliseconds
      // explicitly set cookie to lax
      // to make sure that all cookies accept it
      // you should never use none anyway
      sameSite: 'lax',
    },
  })
);
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  req.session.clientId = 'abc123';
  req.session.myNum = 5;
  res.json('you are now logged in');
});

app.use(async (req, res, next) => {
  if (!req.session || !req.session.clientId) {
    const err = new Error('You shall not pass');
    err.statusCode = 401;
    next(err);
  }
  next();
});

app.get('/profile', async (req, res) => {
  res.json(req.session);
});

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
