const express = require("express");
const router = express.Router();

const {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");

router.get("/", getAllProfiles);
router.get("/:id", getProfileById);
router.post("/", createProfile);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
