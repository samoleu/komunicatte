const Chat = require('../models/chatModel');

const createChat = async (req, res) => {
    try {
        const { members } = req.body;
    
        if (!members) {
            return res.status(400).json({ message: "Please provide members." });
        }
        
        const chat = await Chat(req.body);
        await chat.save();
        res.status(201).json(chat);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findAllChatsByProfile = async (req, res) => {
    try {
        const chats = await Chat.find({members: req.params.id});
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteChat = async (req, res) => {
    try {
        const { id } = req.params;
        const chat = await Chat.findByIdAndDelete(id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateChatById = async (req, res) => { 
    try {
        const { id } = req.params;

        await Chat.findByIdAndUpdate(id, req.body);
        return res.status(200).json();
   
    } catch (error) {   
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createChat,
    updateChatById,
    findAllChatsByProfile,
    deleteChat
}