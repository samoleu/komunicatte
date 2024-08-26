const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    nameChat: {
      type: String,
      required: [true, 'Please provide a name.'],
    },
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
      status: {
        // true: lida, false: não lida
        type: Boolean,
        required: false,
        default: false,
      },
    },
    members: {
      type: Array,
      required: [true, 'Please provide members.'],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
