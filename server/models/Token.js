const {Schema, model} = require("mongoose")

const schema = new Schema({
    user: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
})

module.exports = model("Token", schema)