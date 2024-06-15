const Chat = require("../models/chatModel");

const createChat = async (req, res) => {
  try {
    const { members } = req.body;

    const chatExists = await Chat.countDocuments(members);

    if(chatExists) {
      return res.status(400).json({ message: "Chat already exists." });
    }

    if (!members) {
      return res.status(400).json({ message: "Please provide members." });
    }

    const chat = await Chat(req.body);
    await chat.save();
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: `Error occurred while creating a user: ${error.message}` });
  }
};

const findAllChatsByProfile = async (req, res) => {
  try {
    const chats = await Chat.find({ members: req.params.id });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: `Error occurred while finding chats of a user: ${error.message}` });
  }
};

const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: `Error occurred while deleting chat of a user: ${error.message}` });
  }
};

const updateChatById = async (req, res) => {
  try {
    const { id } = req.params;
    await Chat.findByIdAndUpdate(id, req.body);
    return res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: `Error occurred while change proprieties chat: ${error.message}` });
  }
};

module.exports = {
  createChat,
  updateChatById,
  findAllChatsByProfile,
  deleteChat,
};
