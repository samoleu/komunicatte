const Example = require("../models/exampleModel");

const findAllExamples = async (req, res) => {
  try {
    const examples = await Example.find({});
    res.status(200).json(examples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findExampleById = async (req, res) => {
  try {
    const { id } = req.params;
    const example = await Example.findById(id);
    res.status(200).json(example);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  findAllExamples,
  findExampleById,
};
