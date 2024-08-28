const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    nameChat: {
      type: String,
      required: false,
    },
    createdBy: {
      type: String,
      required: false,
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
