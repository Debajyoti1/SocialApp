const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = async (req, res) => {
    try {
        const existingPost = await Post.findById(req.body.post)
        if (existingPost) {
            const newComment=await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            })
        existingPost.comments.push(newComment)
        existingPost.save()
        }
        res.redirect('/')
    }
    catch(err){
        console.log(err);
    }
}