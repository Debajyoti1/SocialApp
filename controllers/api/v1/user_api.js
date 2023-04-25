const User = require('../../../models/user')
const jwt = require('jsonwebtoken')

module.exports.createSession = async (req, res) => {

    try {
        let existingUser = await User.findOne({ email: req.body.email })
        if (!existingUser || existingUser.password!=req.body.password) {
            return res.status(401).json({
                message: 'Invalid credential'
            })
        }
        else{
            return res.status(200).json({
                message: 'Sign in successful',
                data: {
                    token: jwt.sign(existingUser.toJSON(),process.env.SECRET || 'sample-secret123',{expiresIn: '1d'})
                }
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}