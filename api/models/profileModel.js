const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema(
  {
    accountRef: {
      type: String,
      required: true,
    },
    profileId: {
      type: String,
      required: true,
    },
    profileName: {
      type: String,
      required: false,
    },
    activityStatus: {
      //online, offline, do not disturb
      type: String,
      required: false,
      default: "offline",
    },
    bio: {
      type: String,
      required: false,
      default: "Hello, I am using Komunicatte!",
    },
    profilePicture: {
      type: String,
      required: false,
      default: "https://imgur.com/mCHMpLT",
    },
    friends: {
      type: Array,
      required: false,
      default: [],
    },
    communityRefs: {
      type: Array,
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
