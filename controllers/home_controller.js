const Post = require('../models/post')
const User = require('../models/user')

module.exports.home = async (req, res) => {
    // console.log(req.cookies);
    // res.cookie('b','c')
    try {
        const allUsers = await User.find({})
        const posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comment',
                populate: {
                    path: 'user'
                }
            })
        return res.render('home', {
            title: "Home",
            posts: posts,
            all_user: allUsers
        })
    }
    catch (err) {
        console.log(err);
    }
    return res.render('home', {
        title: "Home",
        posts: {}
    })
}