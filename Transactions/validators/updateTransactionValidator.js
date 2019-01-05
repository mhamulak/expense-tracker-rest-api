const { param, body } = require('express-validator/check');

module.exports = [
  param('id')
    .trim()
    .isMongoId()
    .withMessage('Invalid Id format.'),
  body('value')
    .trim()
    .isDecimal({ force_decimal: true, decimal_digits: '2', locale: "en-US" })
    .isFloat({ min: 0.00, max: 100000.00, locale: 'en-US' }),
  body('category')
    .trim()
    .isMongoId(),
  body('description')
    .trim()
    .isString()
    .isLength({ min: 1, max: 100 })
    .escape()
];
