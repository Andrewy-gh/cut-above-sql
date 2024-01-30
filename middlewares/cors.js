import cors from 'cors';

const whitelist = new Set(['http://localhost:5173', 'http://localhost:3001']);
const corsOptions = {
  optionsSuccessStatus: 200,
  origin: function (origin, callback) {
    if (whitelist.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

export default (() => cors(corsOptions))();
