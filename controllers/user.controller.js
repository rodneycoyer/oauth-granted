const User = require("../models/user.model");

// GET user list
exports.user_list = (req, res) => {
    User.find()
    .then((users) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
    })
    .catch(err => next(err));
};

// user registration
exports.user_signup = (req, res) => {
    User.register(
        new User({username: req.body.username}),
        req.body.password,
        (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.json({err: err});
            } else {
                if (req.body.firstName) {
                    user.firstName = req.body.firstName;
                }
                if (req.body.lastName) {
                    user.lastName = req.body.lastName;
                }
                user.save(err => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader("Content-Type", "application/json");
                        res.json({err: err});
                        return;
                    }
                    passport.authenticate("local"), (req, res, () => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json({success: true, status: "Registration Successful!"});
                    });
                });
            }
        }
    );
};

// user login
exports.user_login = (req, res) => {
    const token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({success: true, token: token, status: "you are successfully logged in!"});
};

// user logout
exports.user_logout = (req, res) => {
    if (req.session) {
        res.session.destroy();
        res.clearCookie("session=id");
        res.redirect("/");
    } else {
        const err = new Error("you are not logged in");
        err.status = 401;
        return next(err);
    };
};