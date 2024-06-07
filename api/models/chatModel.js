const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema(
    {
        lastMessage: {
            message: {
                type: String,
                required: false,
            },
            sender: {
                type: String,
                required: false,
            },
            timestamp: {
                type: Date,
                required: false,
            },
            status: { // true: lida, false: não lida
                type: Boolean,
                required: false,
                default: false,
            },
        },
        members: {
            type: Array,
            required: true,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;