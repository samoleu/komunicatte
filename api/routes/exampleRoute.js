const express = require("express");
const Example = require("../models/exampleModel");
const router = express.Router();
const {
  findAllExamples,
  findExampleById,
} = require("../controllers/exampleController");

router.get("/", findAllExamples);
router.get("/:id", findExampleById);

module.exports = router;
