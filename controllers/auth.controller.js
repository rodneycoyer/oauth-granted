const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model"); // passportLocalMongoose import included in Schema.
const JwtStrategy = require("passport-jwt").Strategy; // jwt strategy
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken"); // create, sign, verify tokens

const config = require("../env/config");

// store user session on server
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// create and sign jwt token. 1hr expiration
exports.create_token = user => {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
};

// local strategy. use authenticate() as verify cb function from passportLocalMongoose.
exports.local = passport.use(new LocalStrategy(User.authenticate()));

// jwt strategy, verify cb function from passport-jwt
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.secretKey;
exports.jwt_passport = passport.use(
    new JwtStrategy(
        options,
        (jwt_payload, done) => {
            console.log("JWT payload", jwt_payload);
            User.findOne({_id: jwt_payload._id}, (err, user) => {
                if (err) {
                    return done(err, false);
                } else if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    )
);

// verify user jwt
exports.verify_user = passport.authenticate("jwt", {session: false});