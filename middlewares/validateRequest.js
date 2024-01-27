import ApiError from '../utils/ApiError.js';

const validateRequest = (schema) => {
  return async (req, res, next) => {
    const { error, value } = await schema.validateAsync(req.body);
    if (error) {
      throw new ApiError(400, error.details[0].message);
    }
    if (!req.value) {
      req.value = {};
    }
    req.value['body'] = value;
    next();
  };
};

export default validateRequest;
