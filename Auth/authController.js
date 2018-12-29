const jwt = require("jsonwebtoken");

const User = require("../models/User");

const config = require("../config");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });

    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      throw new Error(`Could not find user: ${username}`);
    }

    const token = generateJWT({ userId: user._id, username });

    res.status(200).json({ success: true, data: { token } });
  } catch (error) {
    next(error);
  }
};

function generateJWT(claims) {
  return jwt.sign(claims, config.jwt.secret, {
    expiresIn: config.jwt.expirationTime
  });
}
