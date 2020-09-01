const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Plantschema = mongoose.Schema({
    name: {
        type: String
    },
    quantity: {
        type: Number
    }
    // lettuce: {
    //     quantity: {
    //         type: Number
    //     }
    // },
    // basil: {
    //     quantity: {
    //         type: Number
    //     }
    // },
    // tomatoes: {
    //     quantity: {
    //         type: Number
    //     }
    // },
    // cucumbers: {
    //     quantity: {
    //         type: Number
    //     }
    // },
    // chard: {
    //     quantity: {
    //         type: Number
    //     }
    // },
    // chard: {
    //     quantity: {
    //         type: Number
    //     }
    // }
    
})

const Plants = mongoose.model("Plants", Plantschema);

module.exports = Plants;