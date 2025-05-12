const express = require('express');
const router = express.Router();
const consolasCtrl = require('../controllers/consolas.controller');

router.get('/consolas/cargar-desde-xml', consolasCtrl.getConsolasDesdeXML);
router.get('/consolas/:slug/juegos', consolasCtrl.getJuegosPorConsola);

module.exports = router;
