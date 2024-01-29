import 'dotenv/config';

export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT || 3001;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_USERNAME = process.env.REDIS_USERNAME;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
export const SESSION_SECRET = process.env.SESSION_SECRET;
