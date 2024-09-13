const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionsModel = mongoose.model("transactions");

  const getUser = await usersModel
    .findOne({
      _id: req.user._id,
    })
    .select("-password -__v");

  const getTransactions = await transactionsModel.find({
    user_id: req.user._id,
  }).sort('createdAt');

  const userWithTransactions = {
    ...getUser.toObject(),
    transactions: getTransactions,
  };

  res.status(200).json({
    status: "success",
    message: "Data User fetched succesfully!",
    data: userWithTransactions,
  });
};

module.exports = userDashboard;
