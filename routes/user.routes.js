const express = require("express");
const user_controller = require("../controllers/user.controller");
const userRouter = express.Router();

// login
userRouter.post("/login", user_controller.user_login);

// logout
userRouter.get("/logout", user_controller.user_logout);

// list users
userRouter.get("/", user_controller.user_list);

// register new user
userRouter.post("/signup", user_controller.user_signup);

// update user info

// delete user Id

// delete all users

module.exports = userRouter;