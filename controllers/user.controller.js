const User = require("../models/user.model");
const passport = require("passport");

// user login
exports.user_login = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({success: true, status: "OAuth Granted. You are successfully logged in!"});
};

// user logout
exports.user_logout = (req, res, next) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie("session-id");
        res.redirect("/");
    } else {
        const err = new Error("you are not logged in");
        err.status = 401;
        return next(err);
    }
};

// list all users
exports.user_list = (req, res) => {
    User.find()
    .then((users) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
    })
    .catch(err => next(err));
};

// register new user. passport register() method.
exports.user_signup = (req, res) => {
    User.register(
        new User({username: req.body.username}),
        req.body.password,
        err => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.json({err: err});
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({success: true, status: "Registration Accepted!"});
                });
            }
        }
    );
};

// update user
exports.user_update = (req, res) => {
    res.send(`NOT IMPLEMENTED: User PUT Update ${req.user._id}`);
};

// delete user
exports.user_deleteId = (req, res) => {
    res.send(`NOT IMPLEMENTED: User DELETE ${req.user._id}`);
};

// delete all users
exports.user_deleteAll = (req, res) => {
    res.send(`NOT IMPLEMENTED: User DELETE ALL`)
};