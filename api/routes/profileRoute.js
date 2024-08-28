const express = require("express");
const router = express.Router();

const {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
  getProfilesByClerkId,
} = require("../controllers/profileController");

router.get("/", getAllProfiles);
router.get("/:id", getProfileById);
router.post("/", createProfile);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);
router.get("/clerk/:id", getProfilesByClerkId);

module.exports = router;
