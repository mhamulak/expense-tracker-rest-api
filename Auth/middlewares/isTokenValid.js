const jwt = require("jsonwebtoken");

const AuthorizationError = require("../errors/AuthorizationError");

const { jwt: { secret } } = require("../../config");

module.exports = async (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, secret);

    if (!decodedToken) {
      throw new AuthorizationError("Invalid token");
    }

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    next(new AuthorizationError(error.message));
  }
};
