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

const getProfileByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: "Invalid profile name" });
    }

    const profiles = await Profile.find({
      profileName: { $regex: name, $options: "i" }, // Busca insensível a maiúsculas/minúsculas
    });
    if (profiles.length === 0) {
      return res.status(404).json({ message: "No profiles found" });
    }
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProfile = async (req, res) => {
  try {
    const { accountRef, profileId, profileName } = req.body;

    if (accountRef === "" || profileId === "" || profileName === "" || !profileName || !accountRef || !profileId) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    if (await Profile.findOne({ profileId })) {
      return res.status(409).json({ message: "Profile with this ID already exists" });
    }

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

const addFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const { friendId } = req.body; // este é o Id do mongo

    // Verificação se o `friendId` foi fornecido
    if (!friendId) {
      return res.status(400).json({ message: "Friend ID is required" });
    }

    if(friendId === id){
      return res.status(400).json({ message: "You can't add yourself as a friend" });
    };

    // Buscar perfis de ambos os usuários
    const myProfile = await Profile.findById(id);
    const friendProfile = await Profile.findById(friendId);

    // Verificação se os perfis existem
    if (!myProfile) {
      return res.status(404).json({ message: "Your profile not found" });
    }

    if (!friendProfile) {
      return res.status(404).json({ message: "Friend profile not found" });
    }

    // Verificação se o `friendId` já está na lista de amigos do usuário
    if (myProfile.friends.includes(friendId)) {
      return res.status(409).json({ message: "Friend already added" });
    }

    // Verificação se o id do usuário já está na lista de amigos do amigo
    if (friendProfile.friends.includes(id)) {
      return res.status(409).json({ message: "You are already friends" });
    }

    // Adicionando o `friendId` à lista de amigos do usuário
    myProfile.friends.push(friendId);
    await myProfile.save();

    // Adicionando o `id` à lista de amigos do amigo
    friendProfile.friends.push(id);
    await friendProfile.save();

    res.status(200).json({ message: "Friend added successfully", profile: myProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const removeFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const { friendId } = req.body; // Recebendo um único friendId para remover

    // Verificação se o `friendId` foi fornecido
    if (!friendId) {
      return res.status(400).json({ message: "Friend ID is required" });
    }

    // Buscar perfis de ambos os usuários
    const myProfile = await Profile.findById(id);
    const friendProfile = await Profile.findById(friendId);

    // Verificação se os perfis existem
    if (!myProfile) {
      return res.status(404).json({ message: "Your profile not found" });
    }

    if (!friendProfile) {
      return res.status(404).json({ message: "Friend profile not found" });
    }

    // Verificação se o `friendId` está na lista de amigos do usuário
    const friendIndexInMyProfile = myProfile.friends.indexOf(friendId);
    if (friendIndexInMyProfile === -1) {
      return res.status(404).json({ message: "Friend not found in your list" });
    }

    // Verificação se o id do usuário está na lista de amigos do amigo
    const myIndexInFriendProfile = friendProfile.friends.indexOf(id);
    if (myIndexInFriendProfile === -1) {
      return res.status(404).json({ message: "You are not in the friend's list" });
    }

    // Removendo o `friendId` da lista de amigos do usuário
    myProfile.friends.splice(friendIndexInMyProfile, 1);
    await myProfile.save();

    // Removendo o `id` da lista de amigos do amigo
    friendProfile.friends.splice(myIndexInFriendProfile, 1);
    await friendProfile.save();

    res.status(200).json({ message: "Friend removed successfully", profile: myProfile });
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
  getProfileByName,
  addFriend,
  removeFriend,
  getProfilesByClerkId
};