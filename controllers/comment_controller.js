const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = async (req, res) => {
    try {
        const existingPost = await Post.findById(req.body.post)
        if (existingPost) {
            const newComment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            })
            existingPost.comment.push(newComment)
            existingPost.save()
        }
        res.redirect('/')
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const existingComment = await Comment.findById(req.params.id)
        // console.log(existingComment.user._id.toString() , req.user.id);
        if (existingComment.user._id.toString() == req.user.id) {
            const existingPost = await Post.findById(existingComment.post)
            Post.findByIdAndUpdate(existingComment.post, { $pull: { comment: req.params.id } })
            await Comment.deleteOne({ _id: existingComment.id })
        }
        return res.redirect('/')
    }
    catch (err) {
        console.log(err);
        return res.redirect('/')

    }
}