// Require the express module and create a new router object
const express=require('express')
const router=express.Router()

//Any request coming to "/" will be handled by home.js router 
router.use('/',require('./home'))

router.use('/user',require('./user'))
router.use('/post',require('./post'))
router.use('/comment',require('./comment'))
router.use('/like',require('./like'))
router.use('/api',require('./api'))


module.exports=router