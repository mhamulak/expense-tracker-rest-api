const { validationResult } = require('express-validator/check');

const ValidationError = require('../errors/ValidationError');

module.exports = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(toErrorMessage);

      throw new ValidationError(errorMessages);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const toErrorMessage = error => {
  return { param: error.param, message: error.msg };
};
