const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator/check");

const User = require("../models/User");
const config = require("../config");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.validationError(
        errors.array().map(error => {
          return { param: error.param, message: error.msg };
        })
      );
      return;
    }

    const user = await User.create({ username, email, password });

    const token = generateJWT({ username: user.username, email: user.email });

    res.status(201).json({ success: true, data: { token } });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

function generateJWT(claims) {
  return jwt.sign(claims, config.jwt.secret, {
    expiresIn: config.jwt.expirationTime
  });
}