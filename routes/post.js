// Require the express module and create a new router object
const express=require('express')
const router=express.Router()

const postController=require('../controllers/post_controller')

router.post('/create',postController.create)

module.exports=router