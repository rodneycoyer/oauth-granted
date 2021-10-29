const express = require("express");
const user_controller = require("../controllers/user.controller");
const userRouter = express.Router();
const passport = require("passport");

// login
userRouter.post("/login", passport.authenticate("local"), user_controller.user_login);

// logout
userRouter.get("/logout", user_controller.user_logout);

// register new user
userRouter.post("/signup", user_controller.user_signup);

// list all users
userRouter.get("/", user_controller.user_list);

// update userId info
userRouter.post("/:id", user_controller.user_update);

// delete userId
userRouter.delete("/:id", user_controller.user_deleteId);

// delete all users
userRouter.delete("/", user_controller.user_deleteAll);

module.exports = userRouter;
