const express = require("express");

const AuthController = require("./authController");

const registrationValidators = require("./validators/registrationValidators");
const loginValidators = require("./validators/loginValidators");

const checkValidationResult = require('./middlewares/checkValidationResult');

const Router = express.Router();

Router.post("/register", registrationValidators, checkValidationResult, AuthController.register);
Router.post("/login", loginValidators, checkValidationResult, AuthController.login);

module.exports = Router;
