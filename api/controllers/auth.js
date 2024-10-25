const User = require("../models/User");

const register = async (request, response) => {
  const { name, email, password } = request.body;

  const user = await User.create({ name, email, password});
  response.status(201).json({ user });
};

module.exports = { register };
