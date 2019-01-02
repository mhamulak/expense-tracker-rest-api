const express = require('express');

const usersController = require('./usersController');

const getUserValidator = require('./validators/getUserValidator');
const getAccountsValidator = require('./validators/getAccountsValidator');
const addAccountValidator = require('./validators/addAccountValidator');

const checkValidationResult = require('../Auth/middlewares/checkValidationResult');

const Router = express.Router();

Router.get('/:id', getUserValidator, checkValidationResult, usersController.getUser);
Router.get('/:id/accounts', getAccountsValidator, checkValidationResult, usersController.getAccounts);
Router.post('/:id/accounts', addAccountValidator, checkValidationResult, usersController.addAccount);

module.exports = Router;
