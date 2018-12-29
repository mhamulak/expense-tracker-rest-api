const express = require('express');

const usersController = require('./usersController');

const getUserValidator = require('./validators/getUserValidator');
const getAccountsValidator = require('./validators/getAccountsValidator');
const addAccountValidator = require('./validators/addAccountValidator');

const isTokenValid = require('../Auth/middlewares/isTokenValid');
const checkValidationResult = require('../Auth/middlewares/checkValidationResult');

const Router = express.Router();

Router.get('/:id', isTokenValid, getUserValidator, checkValidationResult, usersController.getUser);
Router.get('/:id/accounts', isTokenValid, getAccountsValidator, checkValidationResult, usersController.getAccounts);
Router.post('/:id/accounts', isTokenValid, addAccountValidator, checkValidationResult, usersController.addAccount);

module.exports = Router;
