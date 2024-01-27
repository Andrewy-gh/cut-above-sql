class ApiError {
  constructor(statusCode, message) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.statusCode = statusCode;
    this.message = message;
  }
}

ApiError.prototype = Object.create(Error.prototype);

export default ApiError;
