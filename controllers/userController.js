const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.login_get = (req, res) => {
    res.send('login get success');
}

exports.login_post = [
    body('username', 'Username should not be empty').trim().isLength({min:1}).escape(),
    body('password', 'Password should not be empty').trim().isLength({min:1}).escape(),

    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json({ errors })
        } else {
            User.findOne({username: req.body.username, password: req.body.password})
            .exec((err, user) => {
                if (err) {
                    res.json({err})
                } 
                if (user == null) {
                    res.json({ message: 'no user found' })
                }
                else {
                    jwt.sign({user}, 'secretKey', (err, token) => {
                        if (err) {
                            res.json({err})
                        }
                        else {
                            res.json({token})
                        }
                    })
                }
            })
        }
    }
]