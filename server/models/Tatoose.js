const {Schema, model} = require("mongoose")

const schema = new Schema({
    src: {
        type: String,
        required: true
    },
    size: {
        type: Object, 
        required: true
    },
    style: {
        type: String,
        required: true
    },
    place: {
        type: Array,
        required: true
    }
})

module.exports = model("Tatoos", schema)