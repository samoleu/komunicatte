const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema(
    {
        profilePicture: {
            type: String,
            required: false,
            default: "https://imgur.com/mCHMpLT",
        },
        chatName: {
            type: String,
            required: true,
        },
        lastMessageSender: {
            type: String,
            required: false,
        },
        lastMessage: {
            type: String,
            required: false,
        },
        lastMessageTimestamp: {
            type: Date,
            required: false,
        },
        participants: {
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