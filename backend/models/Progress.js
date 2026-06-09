const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedProblems: [{
      type: mongoose.Schema.Types.ObjectId,
    ref: "Problem"
  }]
});

module.exports = mongoose.model("Progress", ProgressSchema);