const { param, body } = require('express-validator/check');

module.exports = [
  body('name')
    .trim()
    .isString()
    .isLength({ min: 1, max: 30 })
    .escape(),
  body('type')
    .trim()
    .isString()
    .isIn(['income', 'outcome']),
  body('icon')
    .trim()
    .isString()
    .isLength({ min: 1, max: 15 })
    .optional()
    .escape()
];
