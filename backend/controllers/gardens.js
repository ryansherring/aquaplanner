const db = require('../models')

//create a garden and update the user
//NOTE: use this same format for plants in gardens
const createGarden = (req, res) => {
    console.log(req.body)
    if (!req.body.name || !req.body.size) { // CHANGE so that we can make plants dynamic
        return res.status(400).json({
            status: 400,
            message: 'please enter your garden name and size'
        });
    }
    db.Gardens.create(req.body, (error, createdGarden) => {
        if(error)
            return res
                .status(500)
                .json({ message: 'something went wrong', error: error });
        db.Users.findByIdAndUpdate(
            req.session.currentUser.id,
            { $push: { gardens: createdGarden._id } },
            { new: true },
            (error, updatedUser) => {
                if (error)
                    return res
                        .status(500)
                        .json({ message: 'something went wrong', error: error })
                const resObj = {
                    status: 200,
                    data: updatedUser,
                    gardens: createdGarden,
                    requestedAt: new Date().toLocaleDateString()
                };
                res.status(200).json(resObj);
            }
        )
    })
}

//get all
const getGardens = (req, res) => {
    db.Gardens.find((err, plots) => {
        console.log(gardens);
        if (err) {
            return res.status(400).json(err);
        }
        const resObj = {
            message: 'gardens gotted',
            data: gardens,
            requestedAt: new Date().toLocaleString()
        };
        return res.json({resObj});
    });
};

//show one
const showGarden = (req, res) => {
    db.Gardens.findById(req.params.id, (err, foundGarden) => {
        if (err) {
            console.log(err);
        }
        const resObj = {
            data: foundGarden,
            requestedAt: new Date().toLocaleString()
        };
        return res.json({resObj});
    });
};

//update
const editGarden = (req, res) => {
    db.Gardens.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, editedGarden) => {
            console.log('edit route');
            if (err) {
                return res.json(err);
            };
            const resObj = {
                message: 'plot updated!',
                data: editedGarden,
                requestedAt: new Date().toLocaleString()
            };
            return res.json({resObj});
        }
    );
};

//delete one
const destroyGarden = (req, res) => {
    db.Gardens.findByIdAndDelete(req.params.id, (err, deletedGarden) => {
        if (err) {
            return res.json({err});
        };
        const resObj = {
            message: "garden deleted",
            data: deletedGarden,
            requestedAt: new Date().toLocaleString()
        };
        return res.json({resObj});
    })
}

module.exports = {
    createGarden,
    getGardens,
    showGarden,
    editGarden,
    destroyGarden
}