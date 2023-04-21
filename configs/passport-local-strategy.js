const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const existingUser = await User.findOne({ email: email })
        if (!existingUser || existingUser.password != password) {
            return done(null, false)
        }
        return done(null, existingUser)
    }
    catch (err) {
        console.log(err);
        done(err)
    }
}
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const existingUser = await User.findById(id)
        // console.log(existingUser);
        return done(null,existingUser)
    }
    catch (err) {
        return done(err)
    }
})

passport.checkAuthentication=(req,res,next)=>{
    console.log('checked auth');
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/user/sign-in')
}

passport.setAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated()){
        console.log('set auth user');
        res.locals.user=req.user
    }
    return next()
}

module.exports=passport