const { param } = require('express-validator/check');

module.exports = [
  param('id')
    .trim()
    .isMongoId()
    .withMessage('Invalid Id format.'),
];
