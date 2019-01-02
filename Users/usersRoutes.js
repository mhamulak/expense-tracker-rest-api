const express = require('express');

const UsersController = require('./usersController');

const getUserValidator = require('./validators/getUserValidator');
const getAccountsValidator = require('./validators/getAccountsValidator');
const addAccountValidator = require('./validators/addAccountValidator');
const getCategoriesValidator = require('./validators/getCategoriesValidator');

const checkValidationResult = require('../Auth/middlewares/checkValidationResult');

const Router = express.Router();

Router.get('/:id', getUserValidator, checkValidationResult, UsersController.getUser);
Router.get('/:id/accounts', getAccountsValidator, checkValidationResult, UsersController.getAccounts);
Router.post('/:id/accounts', addAccountValidator, checkValidationResult, UsersController.addAccount);
Router.get('/:id/categories', getCategoriesValidator, checkValidationResult, UsersController.getCategories);

module.exports = Router;
