const Community = require("../models/communityModel");

const createCommunity = async (req, res) => {
  try {
    const { communityRef, communityName, admins, visibility, communityMembers } = req.body;

    if (!communityRef || !communityName || typeof visibility !== 'boolean' || !communityMembers) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    if (communityRef === "" || communityName === "" || communityMembers.length === 0) {
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
    const userId = req.user.id; // Supondo que o ID do usuário está disponível em req.user.id

    if (!name || name === "") {
      return res.status(400).json({ message: "Community name is required" });
    }

    let communities = await Community.find({ communityName: name ,
      visibility : true
    });

    // Filtrar comunidades para incluir apenas aquelas que são públicas ou onde o usuário é um membro
    communities = communities.filter(community => {
      return community.visibility === true || community.communityMembers.includes(userId);
    });

    if (communities.length === 0) {
      return res.status(404).json({ message: "No communities found for the given name" });
    }

    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCommunityById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and update the community by ID
    const updatedCommunity = await Community.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedCommunity) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.status(200).json(updatedCommunity);
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
  findAllCommunitiesByName,
  updateCommunityById,
  deleteCommunity,
};