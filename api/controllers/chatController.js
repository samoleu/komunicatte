const Chat = require('../models/chatModel');

const createChat = async (req, res) => {
    try {
        
        const { chatName, participants } = req.body;
    
        if (!chatName || !participants) {
            return res.status(400).json({ message: "Please provide chatName and participants." });
        }

        const chat = new Chat.create(req.body);
        res.status(200).json(chat);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findAllChats = async (req, res) => {
    try {
        const chats = await Chat.find({});
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteChat = async (req, res) => {
    try {
        const { id } = req.params;
        const chat = await Chat.findByIdAndDelete(id);
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};