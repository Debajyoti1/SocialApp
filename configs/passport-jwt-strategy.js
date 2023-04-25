const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET || 'sample-secret123',
};

passport.use(new JWTstrategy(options, async (jwtPayload, done) => {
    try {
        const existingUser = await User.findById(jwtPayload._id);
        if (existingUser) {
            return done(null, existingUser);
        } else {
            return done(null, false,{message: 'Unauthorized'});
        }
    } catch (err) {
        console.log(err);
        return done(err, false, {message: 'Internal Server Error'});
    }
}));

module.exports = passport