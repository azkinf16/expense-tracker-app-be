const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");

  const paramsTransactionId = req.params.transaction_id;

  const { remarks } = req.body;

  if (!paramsTransactionId) throw "Transaction ID is required!";

  if (!validator.isMongoId(paramsTransactionId.toString()))
    throw "Please provide a valid id!";

  const getTransaction = await transactionsModel.findOne({
    _id: paramsTransactionId,
  });

  if (!getTransaction) throw "Transaction not found!";

  await transactionsModel.updateOne(
    {
      _id: paramsTransactionId,
    },
    {
      remarks,
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Edit transaction successfully",
  });
};

module.exports = editTransaction;
