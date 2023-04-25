const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy
const crypto = require('crypto')
const User = require('../models/user')

passport.use(new googleStrategy({
    clientID: '432688612843-h4n62hmffijtd6cbbcld1u3dcilc411e.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/user/auth/google/callback'
},
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
            const existingUser = await User.findOne({ email: profile.emails[0].value })

            if (existingUser) {
                return done(null, existingUser)
            }
            else {
                const newUser= await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                })
                return done(null,newUser)
            }
        } catch (err) {
            return done(err,null)
        }
    })
)

module.exports=passport