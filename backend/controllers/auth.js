const bcrypt = require('bcryptjs');
const db = require('../models');

// post register authorization
const signup = (req, res) => {
    console.log(req.body);
    // verify that name, email, pw exists
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 400,
            message: 'name, email, and password required'

        });
    }
    // verify account does not already exist
    db.Users.findOne({email: req.body.email}, (err, foundUser) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                message: 'something went wrong, try again'
            })
        }
        if (foundUser) {
            return res.status(400).json({
                status: 400,
                message: 'email already registered, try again'
            })
        }

        // generate 10 salt for encryption hash
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: 'something went wrong, please try again'
                })
            }
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        message: 'something went wrong, please try again'
                    })
                }
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                };
                db.Users.create(newUser, (err, savedUser) => {
                    if (err) {
                        return res.status(500).json({
                            status: 500,
                            message: err
                        })
                    }
                    res.sendStatus(201);
                });
            });
        });
    });
};

// post login: check if user credentials match database
const login = (req, res) => {
    db.Users.findOne({ email: req.body.email }, (err, foundUser) => {
        if (err) return res.status(500).json({message: 'something went wrong', err: err});
        if (!foundUser) return res.status(400).json({message: 'user does not (yet) exist'});
        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if(err) return res.status(500).json({mesage: 'something went wrong', err: err});
            if(isMatch) {
                req.session.currentUser = {
                    id: foundUser._id,
                    name: foundUser.name,
                    email: foundUser.email
                };
                const resObj = {
                    status: 200,
                    data: foundUser._id,
                    requestedAt: new Date().toLocaleString(),
                    message: 'success!',
                }
                return res.status(200).json(resObj)
            } else {
                res.status(400).json({message: 'username/password is incorrect'})
            }
        })
    })
};

// get: verify session of logged in user
const verify = (req, res) => {
    if(!req.session.currentUser) {
        return res.status(401).json({message: 'unauthorized user'})
    }
    res.status(200).json({ message: `Current user verified. User ID: ${req.session.currentUser.id}` })
}

// delete: delete session
const logout = (req, res) => {
    if(!req.session.currentUser) return res.status(401).json({message: 'Unauthorized user'});
    req.session.destroy(err => {
        if(err) return res.status(500).json({message: 'something went wrong, please try again'})
        res.sendStatus(200)
    })
};

module.exports = {
    signup,
    login,
    verify,
    logout
}