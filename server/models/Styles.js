const {Schema, model} = require("mongoose")

const schema = new Schema({
    key:{
        type: String
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    }
})

module.exports = model("Styles", schema)