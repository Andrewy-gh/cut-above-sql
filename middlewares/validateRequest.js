import ApiError from '../utils/ApiError.js';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      throw new ApiError(400, result.error.details[0].message);
    }
    if (!req.value) {
      req.value = {};
    }
    req.value['body'] = result.value;
    next();
  };
};
