const express = require('express');
const router = express.Router();

const teamController = require('../controllers/teamController');

router.get('/', teamController.index);

router.get('/:id', teamController.team);

module.exports = router;