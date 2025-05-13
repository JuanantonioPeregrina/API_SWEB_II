const express = require('express');
const router = express.Router();
const empresasCtrl = require('../controllers/empresas.controller');

router.get('/empresas', empresasCtrl.getAll);
router.post('/empresas', empresasCtrl.create);
router.get('/empresas/:id', empresasCtrl.getById);
router.put('/empresas/:id', empresasCtrl.update);
router.delete('/empresas/:id', empresasCtrl.remove);
router.get('/empresas/:id/videojuegos', empresasCtrl.getVideojuegos);
router.post('/empresas/:empresaId/consolas/:consolaId', empresasCtrl.addVideojuego);
router.put('/empresas/:id/videojuegos', empresasCtrl.updateVideojuego);
router.delete('/empresas/:id/videojuegos', empresasCtrl.removeVideojuego);

module.exports = router;