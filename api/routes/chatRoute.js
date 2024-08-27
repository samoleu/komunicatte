const express = require("express");
const Chat = require("../models/chatModel");
const router = express.Router();
const { createChat, updateChatById, deleteChatById, findAllChatsByProfile } = require('../controllers/chatController');

router.post('/', createChat);
router.get('/:id', findAllChatsByProfile);
router.delete('/:id', deleteChatById);
router.put('/:id', updateChatById);

module.exports = router;
