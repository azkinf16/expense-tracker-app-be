const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/emailManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password, confirm_password, name, balance } = req.body;

  // validation
  if (!email) throw "Email must be provided";
  if (!password) throw "Password must be provided";
  if (!name) throw "Name must be provided";

  if (password.length < 5) throw "Password must be at least 5 character long";
  if (password !== confirm_password)
    throw "Password and confirmed password doesn't match!";

  // duplicate data validation
  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw "This email already exist!";

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  const accessToken = jwtManager(createdUser);

  await emailManager(
    createdUser.email,
    "Welcome to expense tracker PRO. We hope you can manage your expenses easily from our platform",
    "Welcome to Expense Tracker PRO!"
  );

  res.status(200).json({
    status: "success",
    message: "User register successfully!",
    accessToken: accessToken,
  });
};

module.exports = register;
