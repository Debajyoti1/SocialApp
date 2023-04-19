const User = require('../models/user')

module.exports.profile = async (req, res) => {
    try {
        if (req.cookies.user_id) {
            const existingUser = await User.findById(req.cookies.user_id)
            if (existingUser) {
                return res.render('user_profile', {
                    title: "Social App / Profile",
                    user: existingUser
                })
            }
            else {
                return res.render('user_sign_in', {
                    title: "Social App / Profile"
                })
            }
        }
        else {
            return res.render('user_sign_in', {
                title: "Social App / Profile"
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.render('user_sign_in', {
            title: "Social App / Profile"
        })
    }
}

module.exports.signup = (req, res) => {
    return res.render('user_sign_up', {
        title: "Social App/ Signup"
    })
}

module.exports.signin = async (req, res) => {
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

module.exports.createSession = async (req, res) => {
    try {
        // console.log('inside create session',req.body.email);
        const existingUser = await User.findOne({ email: req.body.email })
        // console.log(existingUser);
        if (!existingUser || existingUser.password != req.body.password) {
            return res.render('user_sign_in', {
                title: "Social App/ Signin"
            })
        }
        else {
            console.log('login success')
            res.cookie('user_id', existingUser.id)
            return res.redirect('/user/profile')
        }

    }
    catch (err) {
        console.log('login failed')
        return res.redirect('/user/profile')
    }
}