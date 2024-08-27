const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  createChannel,
  sendMessage,
  getChannelByUserId,
  getUserById,
} = require("../controllers/streamController");

router.get("/authenticate/:id", authenticateUser);
router.post("/create-channel", createChannel);
router.post("/send-message", sendMessage);
router.get("/channels/:id", getChannelByUserId);
router.get("/user/:id", getUserById);

module.exports = router;
