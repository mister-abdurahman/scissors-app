const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: [true, "Enter your Email"], unique: true },
    password: {
      type: String,
      minLength: 4,
      required: [
        true,
        "Your password should contain lower and upper letter case, a number, a character and be at least 5 length long",
      ],
    },
    urlId: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);