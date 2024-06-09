const express = require("express");
const Chat = require("../models/chatModel");
const router = express.Router();
const {
  createChat,
  updateChatById,
  deleteChat,
  findAllChatsByProfile,
} = require("../controllers/chatController");

router.post("/", createChat);
router.get("/:id", findAllChatsByProfile);
router.delete("/:id", deleteChat);
router.put("/:id", updateChatById);

module.exports = router;
