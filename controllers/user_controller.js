const User = require('../models/user')

module.exports.profile = async (req, res) => {
    try {
        const existingUser = await User.findById(req.params.id)
        return res.render('user_profile', {
            title: "Social App / Profile",
            profile_user: existingUser
        })
    } catch (err) {
        console.log(err);
        return res.render('user_profile', {
            title: "Social App / Profile",
            profile_user: {}
        })
    }

}

module.exports.update = async (req, res) => {
    try {
        if (req.user.id == req.params.id) {
            await User.findByIdAndUpdate(req.params.id, { name: req.body.name, email: req.body.email })
            req.flash('success', 'Profile updated successfully!')
        }
        else { req.flash('error', 'Profile updated failed!') }
        return res.redirect('back')
    }
    catch (err) {
        console.log(err);
        req.flash('error', 'Profile updated failed!')
        return res.redirect('back')
    }
}

module.exports.signup = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile')
    }
    return res.render('user_sign_up', {
        title: "Social App/ Signup"
    })
}

module.exports.signin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile')
    }
    return res.render('user_sign_in', {
        title: "Social App/ Signin"
    })
}

module.exports.create = async (req, res) => {
    try {
        if (req.body.password !== req.body.confirm_password) {
            req.flash('error', 'Password mismatch!')
            console.log('Password mismatch');
            return res.redirect('/user/sign-up');
        }
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            req.flash('error', 'Email already exist!')
            return res.redirect('/user/sign-up');
        }
        await User.create(req.body);
        req.flash('success', 'Profile creation success!')
        return res.redirect('/user/sign-in');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error occured while sign up!')
        return res.redirect('/');
    }
}

module.exports.createSession = (req, res) => {
    req.flash('success', 'Logged in successful')
    return res.redirect('/')
}

module.exports.destroySession = (req, res) => {
    req.logout((err) => {
        console.log(err);
    })
    req.flash('success', 'Logged out successful')
    return res.redirect('/')
}