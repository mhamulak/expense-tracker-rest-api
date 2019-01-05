const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formatValue = (value) => {
  return parseFloat(value).toFixed(2);
}

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
      type: Schema.Types.Decimal128,
      set: formatValue,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
