const Post = require('../models/post')
const Comment = require('../models/comment')
module.exports.create = async (req, res) => {
    try {
        const createdPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        if (req.xhr){
            const popPost=await Post.findById(createdPost._id).populate({
                path: 'user',
                select: '-password'
            })
            return res.status(200).json({
                data: {
                    post: popPost
                },
                message: 'Post created!'
            })
        }
        req.flash('success', 'Post creation successful')
        return res.redirect('/')
    }
    catch (err) {
        console.log(err);
        return res.redirect('/')
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const existingPost = await Post.findById(req.params.id)
        if (existingPost) {

            if (existingPost.user == req.user.id) {
                await Comment.deleteMany({ post: existingPost.id })
                await Post.deleteOne({ _id: existingPost.id })
                req.flash('success', 'Post deletion successful')
                if (req.xhr){
                    return res.status(200).json({
                        data: req.params.id,
                        message: "Post Deleted"
                    })
                }

            }
            else {
                console.log(existingPost, req.user)
                console.log('post id not matched');
            }

        }
        else { console.log('post not found'); }
        return res.redirect('/')
    }
    catch (err) {
        console.log(err);
        return res.redirect('/')
    }
}