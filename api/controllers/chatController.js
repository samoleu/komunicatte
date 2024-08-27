const Chat = require("../models/chatModel");

//TODO Seria interessante checar se os membros passados no corpo da requisição realmente existem.
const createChat = async (req, res) => {  
  try {
    const { members } = req.body;

    const isPrivate = members.length === 2;

    const chatExists = await Chat.countDocuments({
      members: { $all: members },
      $expr: { $eq: [{ $size: "$members" }, members.length] }
    });
    
    if (isPrivate && chatExists > 0) {
      return res.status(400).json({ message: "Chat already exists." });
    }
      
    const chat = await new Chat(req.body);
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

const deleteChatById = async (req, res) => {
  try {
    const { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: `Error occurred while deleting chat of a user: ${error.message}` });
  }
};

//TODO Seria interessante checar se os membros passados no corpo da requisição realmente existem.
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
  deleteChatById,
};
