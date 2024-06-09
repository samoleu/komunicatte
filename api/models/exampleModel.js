const mongoose = require("mongoose");

const ExampleSchema = mongoose.Schema(
  {
    attribute1: {
      type: String,
      required: [true, "Please enter example attribute1"],
    },
    attribute2: {
      type: Number,
      required: true,
      default: 0,
    },
    attribute3: {
      type: String,
      required: true,
      default: "attr3",
    },
    attribute4: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Example = mongoose.model("Example", ExampleSchema);

module.exports = Example;
