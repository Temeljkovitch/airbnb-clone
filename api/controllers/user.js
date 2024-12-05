const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const UnauthorizedError = require("../errors/unauthorized");

const getCurrentUser = (request, response) => {
  const { token } = request.signedCookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, data) => {
      if (error) throw error;
      const { _id, name, email } = await User.findById(data.id);
      response.status(StatusCodes.OK).json({ name, email, _id });
    });
  } else {
    response.json(null);
  }
};

const updateUserData = async (request, response) => {
  const { name, email, oldPassword, newPassword } = request.body;
  const { token } = request.signedCookies;

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({ _id: payload.id });

  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Incorrect password!");
  }

  user.password = newPassword;
  user.name = name;
  user.email = email
  await user.save();

  response
    .status(StatusCodes.OK)
    .json({ msg: "Password updated successfully!" });
};

module.exports = {
  getCurrentUser,
  updateUserData,
};
