const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model"); // passportLocalMongoose import included in Schema.

// local strategy. use static passport authenticate() method as verify callback function.
exports.local = passport.use(new LocalStrategy(User.authenticate()));

// store session data with passport and passportLocalMongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
