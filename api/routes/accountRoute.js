const express = require("express");
const Account = require("../models/accountModel");
const router = express.Router();
const {
  createAccount,
	getAccountById,
  deleteAccount,
  updateAccountById,
  getAccountByClerkId,
} = require("../controllers/accountController");

router.post("/", createAccount);
router.get("/:id", getAccountById);
router.delete("/:id", deleteAccount);
router.put("/:id", updateAccountById);
router.get("/clerk/:id", getAccountByClerkId);

module.exports = router;
