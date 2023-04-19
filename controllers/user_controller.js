const User = require('../models/user')

module.exports.profile = (req, res) => {
    return res.render('user_profile', {
        title: "Social App / Profile"
    })
}

module.exports.signup = (req, res) => {
    return res.render('user_sign_up', {
        title: "Social App/ Signup"
    })
}

module.exports.signin = (req, res) => {
    return res.render('user_sign_in', {
        title: "Social App/ Signin"
    })
}

module.exports.create = async (req, res) => {
    try {
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect('/user/sign-up');
        }
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.redirect('/user/sign-up');
        }
        await User.create(req.body);
        return res.redirect('/user/sign-in');
    } catch (err) {
        console.error(err);
        return res.redirect('/');
    }
}

module.exports.createSession = (req, res) => {

}