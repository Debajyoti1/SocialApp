// Require the express module and create a new router object
const express=require('express')
const router=express.Router()
const userController=require('../controllers/user_controller')
const passport=require('passport')

router.get('/profile',passport.checkAuthentication,userController.profile)
router.get('/sign-up',userController.signup)
router.get('/sign-in',userController.signin)
router.post('/create',userController.create)
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'}
),userController.createSession)

module.exports=router