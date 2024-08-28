const Account = require("../models/accountModel");

const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAccount = async (req, res) => {
  try {
    const { clerkUserId, userName, email, profileReferences } = req.body;

    const newAccount = new Account({
      clerkUserId,
      userName,
      email,
      profileReferences,
    });

    const existingAccount = await Account.find({ clerkUserId: clerkUserId });
    if (existingAccount.length > 0) {
      res.status(200).json({
        existingAccount,
      });
    }
    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const { clerkUserId, userName, email, profileReferences } = req.body;

    if (clerkUserId)
      return res
        .status(400)
        .json({ message: "Clerk User ID cannot be updated" });

    const account = await Account.findByIdAndUpdate(
      id,
      {
        userName,
        email,
        profileReferences,
      },
      { new: true }
    );

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findByIdAndDelete(id);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAccountByClerkId = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findOne({ clerkUserId: id });
    if (!account) {
      return res.status(200).json(null);
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAccountById,
  createAccount,
  updateAccountById,
  deleteAccount,
  getAccountByClerkId,
};
