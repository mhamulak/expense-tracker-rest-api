const { body } = require("express-validator/check");

const User = require("../../models/User");

module.exports = [
  body("username")
    .trim()
    .isAlphanumeric()
    .custom(async value => {
      const user = await User.findOne({ username: value });

      if (user) {
        throw new Error("User with the given username already exists.");
      }
    }),
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .custom(async value => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("User with the given email already exists.");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 3, max: 16 }),
  body("passwordConfirmation")
    .trim()
    .custom((value, { req }) => {
      if (req.body.password !== value) {
        throw new Error("Passwords do not match");
      }
    })
];
