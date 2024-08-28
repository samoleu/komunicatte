const express = require("express");
const Community = require("../models/communityModel");
const router = express.Router();
const {
  createCommunity,
	findAllComunittiesByProfile,
  findAllCommunitiesByName,
  deleteCommunity,
  updateCommunityById,
  joinCommunityById,
  leaveCommunityById
} = require("../controllers/communityController");

router.post("/", createCommunity);
router.get("/name/:name", findAllCommunitiesByName);
router.delete("/:id", deleteCommunity);
router.put("/:id", updateCommunityById);
router.get("/profile/:profileId", findAllComunittiesByProfile);
router.put("/join/:id", joinCommunityById);
router.put("/leave/:id", leaveCommunityById);

module.exports = router;