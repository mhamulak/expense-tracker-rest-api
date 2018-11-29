const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator/check");

const User = require("../models/User");
const config = require("../config");

exports.register = async (request, response, next) => {
  const { username, email, password } = request.body;

  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      response.validationError(
        errors.array().map(error => {
          return { param: error.param, message: error.msg };
        })
      );
      return;
    }

    const user = await User.create({ username, email, password });

    response.status(201).json({ success: true });
  } catch (error) {
    response.status(500).json({ success: false });
  }
};

exports.login = async (request, response, next) => {
  const { username } = request.body;

  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      response.validationError(
        errors.array().map(error => {
          return { param: error.param, message: error.msg };
        })
      );
      return;
    }

    const token = generateJWT({ username });

    response.status(200).json({ success: true, data: { token } });
  } catch (error) {
    response.status(500).json({ success: false });
  }
};

function generateJWT(claims) {
  return jwt.sign(claims, config.jwt.secret, {
    expiresIn: config.jwt.expirationTime
  });
}
