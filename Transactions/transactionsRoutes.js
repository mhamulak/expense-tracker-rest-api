const express = require('express');

const TransactionsController = require('./transactionsController');

const checkValidatorResult = require('../Auth/middlewares/checkValidationResult');

const getTransactionValidator = require('./validators/getTransactionValidator');
const deleteTransactionValidator = require('./validators/deleteTransactionValidator');
const updateTransactionValidator = require('./validators/updateTransactionValidator');

const Router = express.Router();

Router.get('/:id', getTransactionValidator, checkValidatorResult, TransactionsController.getTransaction);
Router.put('/:id', updateTransactionValidator, checkValidatorResult, TransactionsController.updateTransaction);
Router.delete('/:id', deleteTransactionValidator, checkValidatorResult, TransactionsController.deleteTransaction);

module.exports = Router;
