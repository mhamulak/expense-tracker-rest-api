const { body } = require('express-validator/check');

module.exports = [
  body('name')
    .trim()
    .isString()
    .isLength({ min: 1, max: 12 })
];
