const { param, body } = require('express-validator/check');

module.exports = [
  param('id')
    .trim()
    .isMongoId()
    .withMessage('Invalid Id format.'),
  body('name')
    .trim()
    .isString()
    .isLength({ min: 1, max: 20 })
    .escape()
];
