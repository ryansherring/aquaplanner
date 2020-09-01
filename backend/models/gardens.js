const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GardenSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'garden name is required']
    },
    size: {
        type: Number
        // make this an axios post on the front end 
    },
    Plants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Plants'
        }
    ],
});

const Gardens = mongoose.model('Gardens', GardenSchema);

module.exports = Gardens;