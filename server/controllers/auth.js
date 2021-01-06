const config = require('config')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) => {
    const user = new User(req.body)

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: err
            })
        }

        user.salt = undefined
        user.hashed_password = undefined

        res.json({
            user
        })
    })
}

exports.signin = (req, res) => {
    const { email, password } = req.body

    // check if user exist
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            })
        }
        // If user is found, make sure email and password match
        // Create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match'
            })
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, config.get('JWT_SECRET'))
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 })
        // return response with user and token to frontend client
        const { _id, firstName, lastName, email, } = user

        return res.json({ token, user: { _id, firstName, lastName, email } })
    })
}

exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({ message: 'Signout success' })
}

exports.requireSignin = expressJwt({
    secret: config.get('JWT_SECRET'),
    algorithms: ["HS256"],
    userProperty: "auth"
})

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id

    if (!user) {
        return res.status(403).json({
            error: 'Access Denied'
        })
    }
    next()
}