const Post = require('../../../models/post')
const Comment = require('../../../models/comment')

module.exports.index = async (req, res) => {
    try {
        //const allUsers = await User.find({})
        const posts = await Post.find({})
            .sort('-createdAt')
            .populate({
                path: 'user',
                select: '-password'
            })
            .populate({
                path: 'comment',
                populate: {
                    path: 'user',
                    select: '-password'
                }
            })
        return res.status(200).json({
            message: 'List of Posts',
            post: posts
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }

}

module.exports.destroy = async (req, res) => {
    try {
        const existingPost = await Post.findById(req.params.id)
        
        if (existingPost) {
            console.log(existingPost.user._id.toString(),req.user.id);
            if(existingPost.user._id.toString()==req.user.id){
                await Comment.deleteMany({ post: existingPost.id })
                await Post.deleteOne({ _id: existingPost.id })
                return res.status(200).json({
                    message: 'Post deleted successfully'
                })
            }
            else{
                return res.status(401).json({
                    message: 'Post can not be deleted'
                })
            }

        }
        else {
            console.log('post not found');
            return res.status(404).json({
                message: 'Post not found'
            })
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}