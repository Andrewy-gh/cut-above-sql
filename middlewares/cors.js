import cors from 'cors';

const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:3001',
]);

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`${origin}: Not allowed by CORS`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default (() => cors(corsOptions))();
