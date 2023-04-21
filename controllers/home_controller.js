const Post=require('../models/post')

module.exports.home=async (req,res)=>{
    // console.log(req.cookies);
    // res.cookie('b','c')
    try{
    const posts=await Post.find({}).populate('user')
    return res.render('home',{
        title: "Home",
        posts: posts
    })
    }
    catch(err){
        console.log(err);
    }
    return res.render('home',{
        title: "Home",
        posts: {}
    })
}