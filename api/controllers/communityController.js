const Community = require("../models/communityModel");

const createCommunity = async (req, res) => {
  try {
    const { communityRef, communityName, admins, visibility, communityMembers } = req.body;

    if (!communityRef || !communityName || !admins || !visibility || !communityMembers) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    if (communityRef === "" || communityName === "" || admins.length === 0 || communityMembers.length === 0) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const newCommunity = new Community({
      communityRef,
      communityName,
      admins,
      visibility,
      communityMembers,
    });

    const savedCommunity = await newCommunity.save();
    res.status(201).json(savedCommunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findAllCommunitiesByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ message: "Community name is required" });
    }

    const communities = await Community.find({ communityName: name }); //TODO: fazer checagem de visibilidade de comunidade para mostrar

    if (communities.length === 0) {
      return res.status(404).json({ message: "No communities found for the given name" });
    }

    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findAllCommunitiesByProfile = async (req, res) => {
  try {
    const communities = await Community.find({ communityMembers: req.params.id });

    if (communities.length === 0) {
      return res.status(404).json({ message: "No communities found for this profile" });
    }

    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCommunityById = async (req, res) => {
  try {
    const { id } = req.params;

    await Community.findByIdAndUpdate(id, req.body);
    return res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const community = await Community.findById(id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    if (!community.admins.includes(userId)) {
      return res.status(403).json({ message: "User is not an admin of this community" });
    }

    await Community.findByIdAndDelete(id);

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCommunity,
  findAllCommunitiesByProfile,
  findAllCommunitiesByName,
  updateCommunityById,
  deleteCommunity,
};