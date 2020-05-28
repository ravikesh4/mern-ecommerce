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
                error: errorHandler(error)
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
                err: 'User not exist, Please signup'
            })
        }
        // if user found check email and password match

        // create authenticate method in user model 

        if(!user.authenticate(password)) {
            return res.json(401).json({
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