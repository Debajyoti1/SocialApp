const Like=require('../models/like')
const Comment=require('../models/comment')
const Post = require('../models/post')

module.exports.toggleLike= async (req,res)=>{
    try {
        let likeable
        let deleted=false
        if(req.query.type=='Post'){
            likeable= await Post.findById(req.query.id).populate('like')
            // console.log(likeable);
        }
        else{
            likeable= await Comment.findById(req.query.id)
        }

        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })
        // console.log(existingLike);
        if(existingLike){
            likeable.like.pull(existingLike._id)
            likeable.save()
            console.log(existingLike._id);
            await Like.deleteOne({_id: existingLike.id})
            deleted=true
        }
        else{
            let newLike = await Like.create({
                user: req.user.id,
                likeable: req.query.id,
                onModel: req.query.type
            })
            likeable.like.push(newLike)
            likeable.save()
            // console.log(likeable);
        }
        return res.status(200).json({
            message: 'Request successful',
            deleted: deleted
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}