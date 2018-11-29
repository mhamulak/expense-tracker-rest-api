const express = require("express");

const authController = require("./authController");

const registrationValidators = require("./validators/registrationValidators");

const Router = express.Router();

Router.post("/register", registrationValidators, authController.register);

module.exports = Router;
