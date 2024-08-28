const Community = require("../models/communityModel");
const Profile = require("../models/profileModel");

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

const findAllComunittiesByProfile = async (req, res) => {
  try {
    const { profileId } = req.params;

    if (!profileId || profileId === "") {
      return res.status(400).json({ message: "Profile ID is required" });
    }

    let communities = await Community.find({ communityMembers: profileId });

    if (communities.length === 0) {
      return res.status(404).json({ message: "No communities found for the given profile" });
    }

    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const findAllCommunitiesByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name || name === "") {
      return res.status(400).json({ message: "Community name is required" });
    }

    let communities = await Community.find({ communityName: { $regex: name, $options: "i" },
      visibility : true
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

    const {communityName, communityDescription, communityPhoto} = req.body;

    const values = {communityName, communityDescription, communityPhoto};

    // Find and update the community by ID
    const updatedCommunity = await Community.findByIdAndUpdate(id, values, { new: true, runValidators: true });

    if (!updatedCommunity) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.status(200).json(updatedCommunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const joinCommunityById = async (req, res) => {
  try {
    const { id } = req.params;
    const { idNewMember } = req.body;

    // Verifica se o novo membro existe
    const newMember = await Profile.findById(idNewMember);
    if (!newMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Encontra a comunidade pelo ID
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Verifica se o membro já faz parte da comunidade
    if (community.communityMembers.includes(idNewMember)) {
      return res.status(400).json({ message: "Member is already part of the community" });
    }

    // Adiciona o novo membro à lista de membros da comunidade
    community.communityMembers.push(idNewMember);

    // Atualiza a comunidade com o novo membro
    const updatedCommunity = await community.save();

    res.status(200).json(updatedCommunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const leaveCommunityById = async (req, res) => {
  try {
    const { id } = req.params;
    const { idMember } = req.body;

    // Verifica se o membro existe
    const member = await Profile.findById(idMember);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Encontra a comunidade pelo ID
    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Verifica se o membro faz parte da comunidade
    const memberIndex = community.communityMembers.indexOf(idMember);
    if (memberIndex === -1) {
      return res.status(400).json({ message: "Member is not part of the community" });
    }

    // Remove o membro da lista de membros da comunidade
    community.communityMembers.splice(memberIndex, 1);

    // Atualiza a comunidade removendo o membro
    const updatedCommunity = await community.save();

    res.status(200).json(updatedCommunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const community = await Community.findById(id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
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
  findAllComunittiesByProfile,
  joinCommunityById,
  leaveCommunityById
};