const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  transactions: [{
    value: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'TransactionCategory',
      required: true
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
