const express = require("express");
const router = express.Router();

const {
  getAllProfiles,
  getProfileById,
  getProfileByName,
  createProfile,
  updateProfile,
  deleteProfile,
  addFriend,
  removeFriend
} = require("../controllers/profileController");

router.get("/", getAllProfiles);
router.get("/:id", getProfileById);
router.get("/name/:name", getProfileByName);
router.post("/", createProfile);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);
router.post("/friend/:id", addFriend);
router.delete("/friend/:id", removeFriend);

module.exports = router;
