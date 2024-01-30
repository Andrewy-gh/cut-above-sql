import session from 'express-session';
import RedisStore from 'connect-redis';
import { SESSION_SECRET } from '../utils/config.js';
import redisClient from '../utils/redis.js';

const sessionConfig = {
  store: new RedisStore({
    client: redisClient,
    prefix: 'session:',
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'cutabove',
  cookie: {
    secure: false, // if true: only transmit cookie over https, in prod, always activate this
    httpOnly: true, // if true: prevents client side JS from reading the cookie
    maxAge: 1000 * 60 * 10, // session max age in milliseconds, currently 10 minutes
    // explicitly set cookie to lax
    // to make sure that all cookies accept it
    // you should never use none anyway
    sameSite: 'lax',
  },
};

export default (() => session(sessionConfig))();
