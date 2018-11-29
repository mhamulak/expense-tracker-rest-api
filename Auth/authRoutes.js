const express = require("express");

const authController = require("./authController");

const registrationValidators = require("./validators/registrationValidators");
const loginValidators = require("./validators/loginValidators");

const Router = express.Router();

Router.post("/register", registrationValidators, authController.register);

Router.post("/login", loginValidators, authController.login);

module.exports = Router;
