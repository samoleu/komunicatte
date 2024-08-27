const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema(
  {
    clerkUserId: {
			type: String,
			required: [true, "Clerk User ID is required"],
		},
		userName: {
			type: String,
			required: [true, "User Name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
		},
		profileReferences: {
			type: Array,
			required: false,
			default: [],		
		}
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
