const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");

const login = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, password } = req.body;

  const getUser = await userModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email doesn't exist in the system!";

  const comparePassword = await bcrypt.compare(password, getUser.password);

  if (!comparePassword) throw "Email and Password do not match!";

  const accessToken = jwtManager(getUser)

  // succes
  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    accessToken: accessToken,
  });
};

module.exports = login;
