const express = require("express");
const router = express.Router();
const contentController = require("../controller/contentController");
const auth = require("../middleware/auth");

router.get("/chapters", auth, contentController.getChapters);

router.get(
  "/chapters/:chapterId/problems",
  auth,
  contentController.getProblemsByChapter
);

module.exports = router;