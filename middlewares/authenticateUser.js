import ApiError from '../utils/ApiError.js';

const authenticateUser = async (req, res, next) => {
  if (!req.session || !req.session.user) {
    throw new ApiError(401, 'Forbidden: not authenticated');
  }
  next();
};

export default authenticateUser;
