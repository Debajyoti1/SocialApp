// Require the express module and create a new router object
const express=require('express')
const router=express.Router()
const userController=require('../controllers/user_controller')
const passport=require('passport')

router.get('/profile/:id',passport.checkAuthentication,userController.profile)
router.get('/sign-up',userController.signup)
router.get('/sign-in',userController.signin)
router.post('/create',userController.create)
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'}
),userController.createSession)
router.get('/sign-out',userController.destroySession)
router.post('/update/:id',userController.update)

router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/user/sign-in'}),userController.createSession)

module.exports=router