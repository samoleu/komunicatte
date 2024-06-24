const mongoose = require("mongoose");

const CommunitySchema = mongoose.Schema(
  {
    communityRef: {
      type: String,
      required: true,
    },
    communityName: {
      type: String,
      required: [true, "Please enter the community's name"],
    },
    communityDescription: {
      type: Number,
      required: false,
    },
    communityPhoto: {
      type: String,
      required: false,
      default: "https://imgur.com/a/SMcxsk5",
    },
    admins: {
      type: Array,
      required: true,
    },
    visibility: {
      // true = public, false = private
      type: Boolean,
      required: [true, "Please specify the community's visibility"],
      default: true,
    },
    communityMembers: {
      type: Array,
      required: [true, "Please provide members"],
    },
    sections: {
      type: Array,
      required: false,
    },
    chats: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

const Community = mongoose.model("Community", CommunitySchema);

module.exports = Community;
