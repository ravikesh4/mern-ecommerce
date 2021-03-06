const User = require('../models/user')
const jwt = require('jsonwebtoken'); //generate signin token
const expressJwt = require('express-jwt'); // for authorization check

const {errorHandler} = require('../helpers/dbErrorHandler')

exports.signup = (req, res) => {
    console.log('req.body', req.body);
    
    const user = new User(req.body);
    user.save((error, user) => {
        if(error) {
            return res.status(400).json({
                error: 'Something went wrong'
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        })
    })
}

exports.signin = (req, res) => {
    // find user based on email 
    const { email, password} = req.body
    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not exist, Please signup'
            })
        }
       if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password doesn't match"
            });
        }

        // generate a signed token userid and secret 
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        // persist the token 't' in cookie with expire date 
        res.cookie('t', token, {expire: new Date() + 9999})
        // return response with user and token to frontend client 
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, email, name, role}});

    })
};

exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({message: 'Signout success'})
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user) {
        return res.status(403).json({
            error: 'Access Denied'
        })
    }
    next()
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin Access denied'
        });
    }
    next();
};