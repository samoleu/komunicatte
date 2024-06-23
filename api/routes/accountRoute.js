const express = require("express");
const Account = require("../models/accountModel");
const router = express.Router();
const {
  createAccount,
	getAccountById,
  deleteAccount,
  updateAccountById,
} = require("../controllers/accountController");

router.post("/", createAccount);
router.get("/:id", getAccountById);
router.delete("/:id", deleteAccount);
router.put("/:id", updateAccountById);

module.exports = router;
