const express = require("express");
const Community = require("../models/communityModel");
const router = express.Router();
const {
  createCommunity,
	findAllCommunitiesByProfile,
  findAllCommunitiesByName,
  deleteCommunity,
  updateCommunityById,
} = require("../controllers/communityController");

router.post("/", createCommunity);
router.get("/name/:name", findAllCommunitiesByName);
router.delete("/:id", deleteCommunity);
router.put("/:id", updateCommunityById);

module.exports = router;