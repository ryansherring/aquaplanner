const db = require ('../models');
// nothing in db until plus is pressed and a number above zero is the quantity
const createPlant = (req, res) => {
    console.log(req.body)
    if (!req.body.name || !req.body.quantity) { // change to name and quantity from frontend
        return res.status(400).json({
            status: 400,
            message: 'please enter your Plant name and quantity' // change with if parameters
        });
    }
    db.Plants.create(req.body, (error, createdPlant) => {
        if(error)
            return res
                .status(500)
                .json({ message: 'something went wrong', error: error });
        db.Gardens.findByIdAndUpdate(
            req.session.currentUser.id, // CHANGE THIS LINE. we need to push a new plant into the current garden when changed from 0
            { $push: { plants: createdPlant._id } },
            { new: true },
            (error, updatedGarden) => {
                if (error)
                    return res
                        .status(500)
                        .json({ message: 'something went wrong', error: error })
                const resObj = {
                    status: 200,
                    data: updatedGarden,
                    plants: createdPlant,
                    requestedAt: new Date().toLocaleDateString()
                };
                res.status(200).json(resObj);
            }
        )
    })
}


// something for adding and subtracting plants

module.exports = {
    createPlant
}