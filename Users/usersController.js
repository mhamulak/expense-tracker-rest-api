const mongoose = require('mongoose');

const Account = require('../models/Account');
const User = require('../models/User');

exports.getUser = async (req, res, next) => {
  const { id: userId } = req.params;

  try {
    const user = await User.findById(userId, 'username email');

    if (!user) {
      throw new Error(`User ID: ${userId} not found.`);
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.getAccounts = async (req, res, next) => {
  const userId = req.userId;

  try {
    const accounts = await Account.find({ user: userId }, 'name');

    res.status(200).json({
      success: true,
      data: accounts
    });
  } catch (error) {
    next(error);
  }
};

exports.addAccount = async (req, res, next) => {
  const { name } = req.body,
    userId = req.userId;

  try {
    const account = new Account({ name, user: userId });
    await account.save();

    res.status(201).json({ success: true })
  } catch (error) {
    next(error);
  }
};
