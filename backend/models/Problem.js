const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  title: String,
difficulty: {
  type: String,
  enum: ["Easy", "Medium", "Hard"],
  default: "Easy",
},  youtubeLink: String, 
  practiceLink: String,
  articleLink: String, 
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter"
  }
});

module.exports = mongoose.model("Problem", ProblemSchema);