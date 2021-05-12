const express = require("express");
const router = express.Router();

const teamController = require("../controllers/teamController");

router.get("/", teamController.index);

router.get("/:league/:teamId", teamController.team);

module.exports = router;
