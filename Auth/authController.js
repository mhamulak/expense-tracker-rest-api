const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator/check");

const User = require("../models/User");
const config = require("../config");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      return res.validationError(
        errors.array().map(error => {
          return { param: error.param, message: error.msg };
        })
      );
    }

    const user = await User.create({ username, email, password });

    const token = jwt.sign(
      { username: user.username, email: user.email },
      config.jwt.secret,
      { expiresIn: config.jwt.expirationTime }
    );

    res.status(201).json({
      success: true,
      data: { token }
    });

    console.log(user);
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
