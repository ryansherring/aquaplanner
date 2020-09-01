const db = require('../models');

// show single user
const showUser = (req, res) => {
    db.Users.findById(req.params.id, (error, foundUser) => {
        if(error) return res.status(500).json({message: 'something went wrong', error: error});
        const resObj = {
            status: 200,
            data: foundUser,
            requestedAt: new Date().toLocaleDateString,
        }
        res.status(200).json(resObj)
    });
}

//update user
const updateUser = (req, res) => {
    db.Users.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedUser) => {
        if(error) return res.status(500).json({message: 'something went wrong', error: error});
        const resObj = {
            status: 200,
            data: updatedUser,
            requestedAt: new Date().toLocaleDateString(),
        };
        res.status(200).json(resObj)
    })
}

module.exports = {
    showUser,
    updateUser,
}