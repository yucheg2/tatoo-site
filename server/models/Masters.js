const {Schema, model} = require("mongoose")

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    comments: Object,
    description: {
        type: String,
        required: true
    },
    favStyles: Object,
    img: {
        type: String,
        required: true
    },
    order: Object,
    rate: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
})

module.exports = model("Masters", schema)