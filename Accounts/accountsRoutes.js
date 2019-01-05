const express = require('express');

const AccountsController = require('./accountsController');

const checkValidationResult = require('../Auth/middlewares/checkValidationResult');

const getAccountsValidator = require('./validators/getAccountValidator');
const deleteAccountValidator = require('./validators/deleteAccountValidator');
const updateAccountValidator = require('./validators/updateAccountValidator');
const getTransactionsValidator = require('./validators/getTransactionsValidator');
const addTransactionValidator = require('./validators/addTransactionValidator');

const Router = express.Router();

Router.get('/:id', getAccountsValidator, checkValidationResult, AccountsController.getAccount);
Router.put('/:id', updateAccountValidator, checkValidationResult, AccountsController.updateAccount);
Router.delete('/:id', deleteAccountValidator, checkValidationResult, AccountsController.deleteAccount);
Router.get('/:id/transactions', getTransactionsValidator, checkValidationResult, AccountsController.getTransactions);
Router.post('/:id/transactions', addTransactionValidator, checkValidationResult, AccountsController.addTransaction);

module.exports = Router;
