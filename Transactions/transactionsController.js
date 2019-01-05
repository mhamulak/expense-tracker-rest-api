const Account = require('../models/Account');
const Category = require('../models/Category');

exports.getTransaction = async (req, res, next) => {
  const userId = req.userId,
    { id: transactionId } = req.params;

  try {
    const account = await Account.findOne(
      { user: userId, transactions: { $elemMatch: { _id: transactionId } } },
      { transactions: { $elemMatch: { _id: transactionId } } }
    )
    .populate('transactions.category', 'name type')
    .lean();

    if (!account) {
      throw new Error(`Transaction ID: ${transactionId} not found.`);
    }

    const transaction = {
      ...account.transactions[0],
      category: { ...account.transactions[0].category },
      value: account.transactions[0].value.toString(),
    };

    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTransaction = async (req, res, next) => {
  const userId = req.userId,
    { id: transactionId } = req.params,
    { value, category: categoryId, description } = req.body;

  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      throw new Error(`Category ID: ${categoryId} not found.`);
    }

    const account = await Account.findOneAndUpdate(
      { 'transactions._id': transactionId, user: userId },
      { $set: {
        'transactions.$.value': value,
        'transactions.$.category': categoryId,
        'transactions.$.description': description
      } }
    );

    if (!account) {
      throw new Error(`Transaction ID: ${transactionId} not found.`);
    }

    res.status(200).json({ success: true })
  } catch (error) {
    next(error);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  const userId = req.userId,
    { id: transactionId } = req.params;

  try {
    const account = await Account.findOneAndUpdate(
      { user: userId, 'transactions._id': transactionId },
      { $pull: { transactions: { _id: transactionId } } }
    );

    if (!account) {
      throw new Error(`Transaction ID: ${transactionId} not found.`);
    }

    res.status(202).json({ success: true });
  } catch (error) {
    next(error);
  }
};
