const express = require("express");
const router = express.Router();

const leagueController = require("../controllers/leagueController");

router.get("", leagueController.home);

router.get("/:id", leagueController.league);

module.exports = router;
