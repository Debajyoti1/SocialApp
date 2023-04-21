const Post=require('../models/post')

module.exports.create=async(req,res)=>{
    try{
    const createdPost = await Post.create({
        content: req.body.content,
        user: req.user._id
    })
    return res.redirect('/')
}
catch(err){
    console.log(err);
    return res.redirect('/')
}
}