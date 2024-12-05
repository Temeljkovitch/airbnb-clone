const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized");
const BadRequestError = require("../errors/badRequest");
const { StatusCodes } = require("http-status-codes");

const register = async (request, response) => {
  const { name, email, password } = request.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError(
      "An account with this email already exists! Please, log in or use a different email to sign up."
    );
  }

  const user = await User.create({ name, email, password });
  response.status(StatusCodes.CREATED).json({ user });
};

const login = async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email: email });

  // Checking if email is registered in our database
  if (!user) {
    throw new UnauthorizedError(
      "Invalid credentials! Please, check your email and password and try again."
    );
  }

  // Checking if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Incorrect password!");
  }

  // Creating token
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email }, // Attaching user id and email to the token
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  response
    .status(StatusCodes.OK)
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
  response.status(StatusCodes.OK).json({ msg: "User logged out!" });
};

module.exports = {
  register,
  login,
  logout,

};
