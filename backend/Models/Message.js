
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },


}, {
    timestamps: true
})
const Message = mongoose.model('messenger', MessageSchema)

module.exports = Message
