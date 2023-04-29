const Comment = require('../models/comment')
const Post = require('../models/post')
const Like = require('../models/like')
const commentMailer=require('../mailer/comment_mailer')
const commentEmailWorker=require('../workers/comment-email-worker')
const queue=require('../configs/kue')

module.exports.create = async (req, res) => {
    try {
        const existingPost = await Post.findById(req.body.post).populate({
            path: 'user',
            select: '-password'
        })
        // console.log(existingPost);
        if (existingPost) {
            const newComment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            })
            existingPost.comment.push(newComment)
            existingPost.save()
            // commentMailer.newComment(existingPost)
            let job = queue.create('emails',newComment).save()
            // console.log('kue here');
            // console.log(job.id);
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
            await Like.deleteMany({likeable: existingComment._id, onModel: 'Comment'})
        }
        return res.redirect('/')
    }
    catch (err) {
        console.log(err);
        return res.redirect('/')

    }
}