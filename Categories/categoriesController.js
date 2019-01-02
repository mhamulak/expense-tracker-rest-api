const Category = require('../models/Category');

exports.getCategory = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId, 'name type');

    if (!category) {
      throw new Error(`Category ID: ${categoryId} not found.`);
    }

    res.status(200).json({
      success: true,
      data: category
    })
  } catch (error) {
    next(error);
  }
};

exports.addCategory = async (req, res, next) => {
  const userId = req.userId,
    { name, type, icon } = req.body;

  try {
    const category = new Category({ name, type, icon, user: userId });
    await category.save();

    res.status(201).json({ sucess: true });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  const categoryId = req.params.id,
    { name, type, icon } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(categoryId, { name, type, icon });

    if (!category) {
      throw new Error(`Category ID: ${categoryId} not found.`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
      throw new Error(`Category ID: ${categoryId} not found.`);
    }

    res.status(202).json({ success: true });
  } catch (error) {
    next(error);
  }
};
