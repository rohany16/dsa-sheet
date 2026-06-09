const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  title: String,
  description: String,
  order: Number
});

module.exports = mongoose.model("Chapter", ChapterSchema);