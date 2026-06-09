const express = require("express");
const router = express.Router();
const progressController = require("../controller/progressController");
const auth = require("../middleware/auth");

router.get("/", auth, progressController.getUserProgress);

router.post("/update", auth, progressController.updateProgress);

module.exports = router;