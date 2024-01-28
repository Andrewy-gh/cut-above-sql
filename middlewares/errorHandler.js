import ApiError from '../utils/ApiError.js';
import { isCelebrateError } from 'celebrate';

const errorHandler = async (err, req, res, next) => {
  console.log('====================================');
  console.log('ERROR HANDLER: ', err);
  console.log('====================================');
  if (isCelebrateError(err)) {
    // how to extract Celebrate Error details: https://stackoverflow.com/a/56865784
    const segments = ['body', 'params'];
    const errorMessages = [];
    for (const segment of segments) {
      console.log('segment: ', segment);
      const error = err.details.get(segment);
      console.log('====================================');
      console.log('iterating through error', error);
      console.log('====================================');
      if (error) {
        const {
          details: [errorDetails],
        } = error; // 'details' is a Map()
        errorMessages.push(errorDetails.message);
        console.log('====================================');
        console.log('errorMessages', errorMessages);
        console.log('====================================');
      }
    }
    // console.log('Celebrate Error: ', errorBody);
    // console.log('Celebrate Error: ', errorDetails.message);
    return res.status(400).json({ error: errorMessages.join(', ') });
  }
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: err.message });
};

export default errorHandler;
