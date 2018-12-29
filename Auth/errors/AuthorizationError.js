module.exports = class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
