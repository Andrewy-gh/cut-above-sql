import ApiError from '../utils/ApiError.js';
import { isCelebrateError } from 'celebrate';
import logger from '../utils/logger/index.js';

const errorHandler = async (err, req, res, next) => {
  logger.error('====================================');
  logger.error('ERROR HANDLER: ', err);
  logger.error('====================================');
  if (isCelebrateError(err)) {
    // how to extract Celebrate Error details: https://stackoverflow.com/a/56865784
    const segments = ['body', 'params'];
    const errorMessages = [];
    for (const segment of segments) {
      const error = err.details.get(segment);
      if (error) {
        const {
          details: [errorDetails],
        } = error; // 'details' is a Map()
        errorMessages.push(errorDetails.message);
      }
    }
    return res.status(400).json({ error: errorMessages.join(', ') });
  }
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: err.message });
};

export default errorHandler;
