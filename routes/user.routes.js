const express = require("express");
const user_controller = require("../controllers/user.controller");
const userRouter = express.Router();
const passport = require("passport");
const authenticate = require("../controllers/auth.controller");

// login
userRouter.post("/login", passport.authenticate("local"), user_controller.user_login);

// logout
userRouter.get("/logout", user_controller.user_logout);

// register new user
userRouter.post("/signup", user_controller.user_signup);

// list all users
userRouter.get("/", authenticate.verify_user, user_controller.user_list);

// update userId info
userRouter.post("/:id", authenticate.verify_user, user_controller.user_update);

// delete userId
userRouter.delete("/:id", authenticate.verify_user, user_controller.user_deleteId);

// delete all users
userRouter.delete("/", authenticate.verify_user, user_controller.user_deleteAll);

module.exports = userRouter;
