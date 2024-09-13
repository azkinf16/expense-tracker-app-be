const express = require("express");

const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getTransactions");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");

const transactionRoutes = express.Router();

// middleware
transactionRoutes.use(auth);

// protected routes
transactionRoutes.post("/addIncome", addIncome)
transactionRoutes.post("/addExpense", addExpense)
transactionRoutes.get("/", getTransactions)
transactionRoutes.delete("/delete/:transaction_id", deleteTransaction)
transactionRoutes.patch("/edit/:transaction_id", editTransaction)

module.exports = transactionRoutes;
