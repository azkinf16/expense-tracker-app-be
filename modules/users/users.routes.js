const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");

const userRoutes = express.Router();

// Routers
userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/forgotPassword", forgotPassword);
userRoutes.post("/resetPassword", resetPassword);

// middleware
userRoutes.use(auth);

// protected routes
userRoutes.get("/dashboard", userDashboard);

module.exports = userRoutes;
