const express = require('express');
const router = express.Router();
const consolasCtrl = require('../controllers/consolas.controller');

router.get('/consolas/xml', consolasCtrl.getConsolasDesdeXML);
router.get('/consolas', consolasCtrl.getAll);
router.post('/consolas', consolasCtrl.create);
router.get('/consolas/:id', consolasCtrl.getById);
router.put('/consolas/:id', consolasCtrl.update);
router.delete('/consolas/:id', consolasCtrl.remove);
router.get('/consolas/:consolaId/videojuegos/:videojuegoId', consolasCtrl.getVideojuegos);
router.post('/consolas/:consolaId/videojuegos/:videojuegoId', consolasCtrl.addVideojuego);
router.put('/consolas/:id/videojuegos', consolasCtrl.updateVideojuego);
router.delete('/consolas/:consolaId/videojuegos/:videojuegoId', consolasCtrl.removeVideojuego);

module.exports = router;
