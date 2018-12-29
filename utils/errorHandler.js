const AuthorizationError = require('../Auth/errors/AuthorizationError');
const ValidationError = require('../Auth/errors/ValidationError');

module.exports = (error, req, res, next) => {
  // TODO log error

  if (req.headersSent) {
    return next(error);
  }

  if (error instanceof AuthorizationError) {
    res.status(401).json({
      success: false,
      error: {
        code: 401,
        message: error.message,
      }
    });
  } else if (error instanceof ValidationError) {
    res.status(422).json({
      success: false,
      error: {
        code: 422,
        message: "Validation error",
        errors: error.errors
      }
    });
  } else {
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        // message: 'Internal server error.',
        message: error.message,
      }
    });
  }
};
