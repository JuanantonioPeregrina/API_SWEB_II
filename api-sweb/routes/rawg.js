const express = require('express');
const router = express.Router();
const { searchAndSyncGames } = require('../controllers/rawg.controller');

router.get('/rawg/search', searchAndSyncGames);

module.exports = router;
