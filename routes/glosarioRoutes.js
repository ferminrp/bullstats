const express = require("express");
const router = express.Router();
const glosarioController = require("../controllers/glosarioController");

router.get("/", glosarioController.glosario);
router.get("/:article", glosarioController.definicion);

module.exports = router;
