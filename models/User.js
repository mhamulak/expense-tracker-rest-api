const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const user = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

async function hashUserPassword(next) {
  try {
    const user = this;

    const hashedPassword = await bcrypt.hash(user.password, 10);

    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
}

user.pre("save", hashUserPassword);

module.exports = mongoose.model("User", user);
