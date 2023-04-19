module.exports.home=(req,res)=>{
    // console.log(req.cookies);
    // res.cookie('b','c')
    
    return res.render('home',{
        title: "Home"
    })
}