const Profile = require("../models/profileModel");

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({});
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProfile = async (req, res) => {
  try {
    const { accountRef, profileId } = req.body;

    if (accountRef === "" || profileId === "" || !accountRef || !profileId) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    if (await Profile.findOne({ profileId })) {
      return res.status(409).json({ message: "Profile with this ID already exists" });
    }

    profileName = profileId;

    const newProfile = new Profile({
      accountRef,
      profileId,
      profileName,
    });

    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { profileName, bio, profilePicture, activityStatus } = req.body;

    const profile = await Profile.findByIdAndUpdate(
      id,
      {
        profileName,
        bio,
        profilePicture,
        activityStatus,
      },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await Profile.findByIdAndDelete(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfilesByClerkId = async (req, res) => {
  try {
    const { id } = req.params;
    const profiles = await Profile.find({ accountRef: id });
    ({ accountRef: id });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
  getProfilesByClerkId,
};
