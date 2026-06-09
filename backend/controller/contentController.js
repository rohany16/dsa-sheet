const Chapter = require("../models/Chapter");
const Problem = require("../models/Problem");

// Get all chapters
exports.getChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find().sort({ order: 1 });

    const result = await Promise.all(
      chapters.map(async (chapter) => {
        const problems = await Problem.find({
          chapter: chapter._id,
        });

        return {
          ...chapter.toObject(),
          problems,
        };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getProblemsByChapter = async (req, res) => {
  try {
    const problems = await Problem.find({
      chapter: req.params.chapterId,
    });

    res.json(problems);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};