const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please, provide a name!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please, provide an email!"],
  },
  password: {
    type: String,
    required: [true, "Please, provide a password!"],
  },
});

UserSchema.pre("save", async function () {
  // Generating salt
  const salt = await bcrypt.genSalt(10);
  // Hashing password
  this.password = await bcrypt.hash(this.password, salt); // The "this" keyword points to the user
});

module.exports = mongoose.model("User", UserSchema);
