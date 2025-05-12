const express = require('express');
const router = express.Router();
const consolasCtrl = require('../controllers/consolas.controller');

router.get('/consolas/xml', consolasCtrl.getConsolasDesdeXML);

module.exports = router;
