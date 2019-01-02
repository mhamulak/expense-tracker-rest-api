const express = require('express');

const CategoriesController = require('./categoriesController');

const checkValidatorResult = require('../Auth/middlewares/checkValidationResult');

const addCategoryValidator = require('./validators/addCategoryValidator');
const deleteCategoryValidator = require('./validators/deleteCategoryValidator');
const getCategoryValidator = require('./validators/getCategoryValidator');
const updateCategoryValidator = require('./validators/updateCategoryValidator');

const Router = express.Router();

Router.get('/:id', getCategoryValidator, checkValidatorResult, CategoriesController.getCategory);
Router.post('/', addCategoryValidator, checkValidatorResult, CategoriesController.addCategory);
Router.put('/:id', updateCategoryValidator, checkValidatorResult, CategoriesController.updateCategory);
Router.delete('/:id', deleteCategoryValidator, checkValidatorResult, CategoriesController.deleteCategory);

module.exports = Router;
