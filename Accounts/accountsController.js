const Account = require('../models/Account');
const Category = require('../models/Category');

exports.getAccount = async (req, res, next) => {
  const { id: accountId } = req.params;

  try {
    account = await Account.findById(accountId, 'name');

    if (!account) {
      throw new Error(`Account ID: ${accountId} not found.`);
    }

    res.status(200).json({
      success: true,
      data: account
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAccount = async (req, res, next) => {
  const { id: accountId } = req.params,
    { name } = req.body;

  try {
    account = await Account.findByIdAndUpdate(accountId, { name });

    if (!account) {
      throw new Error(`Account ID: ${accountId} not found.`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.deleteAccount = async (req, res, next) => {
  const { id: accountId } = req.params;

  try {
    const account = await Account.findByIdAndDelete(accountId);

    if (!account) {
      throw new Error(`Account ID: ${accountId} not found.`);
    }

    res.status(202).json({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.getTransactions = async (req, res, next) => {
  const { id: accountId } = req.params;

  try {
    account = await Account.findById(accountId, 'transactions')
      .populate('transactions.category', 'name type')
      .lean();

    if (!account) {
      throw new Error(`Account ID: ${accountId} not found.`);
    }

    const transactions = account.transactions.map(transaction => {
      return { ...transaction, value: transaction.value.toString() };
    });

    res.status(200).json({
      success: true,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};

exports.addTransaction = async (req, res, next) => {
  const { id: accountId } = req.params,
    { value, category: categoryId, description } = req.body;

  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      throw new Error(`Category ID: ${categoryId} not found.`);
    }

    const account = await Account.findById(accountId);

    if (!account) {
      throw new Error(`Account ID: ${accountId} not found.`);
    }

    account.transactions = [
      ...account.transactions,
      { value, category: categoryId, description, createdAt: new Date() }
    ];
    await account.save();

    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};
