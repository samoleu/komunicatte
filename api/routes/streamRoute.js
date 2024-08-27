const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  createChannel,
  sendMessage,
} = require("../controllers/streamController");

router.get("/authenticate/:id", authenticateUser);
router.post("/create-channel", createChannel);
router.post("/send-message", sendMessage);

module.exports = router;
