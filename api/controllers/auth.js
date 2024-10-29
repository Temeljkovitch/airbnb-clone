const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (request, response) => {
  const { name, email, password } = request.body;

  const user = await User.create({ name, email, password });
  response.status(201).json({ user });
};

const login = async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email: email });

  // Checking if email is registered
  if (!user) {
    throw new Error("Email not registered!");
  }

  // Checking if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Wrong password! Please, try again.");
  }

  // Creating token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  response
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      secure: process.env.NODE_ENV === "production",
      signed: true,
    })
    .json(user);
};

const logout = async (request, response) => {
  response.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  response.status(200).json({ msg: "User logged out!" });
};

const getCurrentUser = (request, response) => {
  const { token } = request.signedCookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, data) => {
      if (error) throw error;
      const { _id, name, email } = await User.findById(data.id);
      response.json({ name, email, _id });
    });
  } else {
    response.json(null);
  }
};

module.exports = { register, login, logout, getCurrentUser };
