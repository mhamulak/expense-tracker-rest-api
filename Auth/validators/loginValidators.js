const { body } = require("express-validator/check");

const bcrypt = require("bcrypt");

const User = require("../../models/User");

module.exports = [
  body("username")
    .trim()
    .isAlphanumeric(),
  body("password")
    .trim()
    .isLength({ min: 3, max: 16 })
    .custom(async (value, { req }) => {
      const user = await User.findOne({ username: req.body.username });

      if (!user) {
        throw new Error("Provided credentials are incorrect.");
      }

      const passwordMatch = await bcrypt.compare(value, user.password);

      if (!passwordMatch) {
        throw new Error("Provided credentials are incorrect.");
      }
    })
];
