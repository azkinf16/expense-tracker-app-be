const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, new_password, reset_code } = req.body;

  if (!email) throw "Email is required!";
  if (!new_password) throw "Please provide new password!";
  if (!reset_code) throw "Reset code is required!";
  if (new_password.length < 5)
    throw "Password must be at least 5 character long";

  const getUserWithResetCode = await usersModel.findOne({
    email: email,
    reset_code: reset_code,
  });

  if (!getUserWithResetCode) throw "Reset code doesn't match!";

  const isSamePassword = await bcrypt.compare(
    new_password,
    getUserWithResetCode.password
  );

  if (isSamePassword) {
    throw "New password cannot be the same as the current password!";
  }

  const hashedNewPassword = await bcrypt.hash(new_password, 12);

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      password: hashedNewPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );

  await emailManager(
    email,
    "Your password reseted successfully. If you have not done yet, please keep it up to contact us!",
    "Reset password successfully"
  );

  res.status(200).json({
    status: "success",
    messsage: "Reset password successfully",
  });
};

module.exports = resetPassword;
