const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.logout_get = (req, res) => {
    res.json({message: 'success'});
}

exports.login_post = [
    body('username', 'Username should not be empty').trim().isLength({min:1}).escape(),
    body('password', 'Password should not be empty').trim().isLength({min:1}).escape(),

    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json({ errors })
        } else {
            User.findOne({username: req.body.username, password: req.body.password}, (err, user) => {
                if (err) {
                    res.json({errors: [err]});
                } 
                else if (user == null) {
                    res.json({ errors: [{msg: 'imcorrect username or password'}]});
                }
                else {
                    jwt.sign({user}, 'secretKey', (err, token) => {
                        if (err) {
                            res.json({errors: [err]});
                        }
                        else {
                            res.json({token});
                        }
                    })
                }
            })
        }
    }
]