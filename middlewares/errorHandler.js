import ApiError from '../utils/ApiError.js';

const errorHandler = async (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: err.message });
};

export default errorHandler;
