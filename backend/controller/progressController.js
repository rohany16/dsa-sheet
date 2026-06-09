const Progress = require("../models/Progress");

exports.getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ user: req.user.id });
    if (!progress) {
      return res.status(200).json({ completedProblems: [] });
    }
    res.status(200).json(progress);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.updateProgress = async (req, res) => {
  const { problemId, completed } = req.body;

  try {
    let progress = await Progress.findOne({ user: req.user.id });

    if (!progress) {
      progress = new Progress({
        user: req.user.id,
        completedProblems: completed ? [problemId] : [],
      });
    } else {
      if (completed && !progress.completedProblems.includes(problemId)) {
        progress.completedProblems.push(problemId);
      } else if (!completed) {
        progress.completedProblems = progress.completedProblems.filter(
          (id) => id.toString() !== problemId.toString()
        );
      }
    }

    await progress.save();
    res.status(200).json(progress);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};