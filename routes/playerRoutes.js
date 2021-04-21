const express = require('express');
const router = express.Router();

const playerController = require('../controllers/playerController');

router.get('/', playerController.index);

router.get('/:id', playerController.player);

module.exports = router;