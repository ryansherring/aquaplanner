const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true , 'name is required']
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    gardens: [
        {
            type: Schema.Types.ObjectId,
            ref: "Gardens"
        }
    ]
})

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;