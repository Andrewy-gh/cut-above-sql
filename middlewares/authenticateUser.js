import ApiError from '../utils/ApiError.js';

const authenticateUser = async (req, res, next) => {
  if (!req.session) {
    console.log('====================================');
    console.log('there is no session');
    console.log('====================================');
  }
  if (!req.session.user) {
    console.log('====================================');
    console.log('session check: ', req.session);
    console.log('there is no user');
    console.log('====================================');
  }
  if (!req.session || !req.session.user) {
    throw new ApiError(401, 'Forbidden: not authenticated');
  }
  next();
};

export default authenticateUser;
