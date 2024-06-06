const express = require('express');
const Chat = require('../models/chatModel');
const router = express.Router();
const { createChat, findAllChats, deleteChat } = require('../controllers/chatController');

router.post('/create', createChat);
router.get('/find', findAllChats);
router.delete('/delete/:id', deleteChat);

module.exports = router;