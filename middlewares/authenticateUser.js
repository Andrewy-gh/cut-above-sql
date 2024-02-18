import ApiError from '../utils/ApiError.js';

export const authenticateUser = async (req, res, next) => {
  if (!req.session) {
    console.log('====================================');
    console.log('there is no session');
    console.log('====================================');
    throw new ApiError(403, 'Forbidden: not authenticated');
  }
  if (!req.session.user) {
    console.log('====================================');
    console.log('session check: ', req.session);
    console.log('there is no user');
    console.log('====================================');
    throw new ApiError(401, 'Session expired, please log in');
  }
  if (!req.session || !req.session.user) {
    throw new ApiError(403, 'Forbidden: not authenticated');
  }
  next();
};

export const authenticateRole = async (req, res, next) => {
  if (req.session.user.role !== 'admin') {
    throw new ApiError(403, 'Forbidden: not authorized to access this page');
  }
  next();
};
