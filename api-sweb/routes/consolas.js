const express = require('express');
const router = express.Router();
const consolasCtrl = require('../controllers/consolas.controller');

router.get('/consolas/xml', consolasCtrl.getConsolasDesdeXML);
router.get('/consolas', consolasCtrl.getAll);
router.post('/consolas', consolasCtrl.create);
router.get('/consolas/:id', consolasCtrl.getById);
router.put('/consolas/:id', consolasCtrl.update);
router.delete('/consolas/:id', consolasCtrl.remove);
router.get('/consolas/:id/videojuegos', consolasCtrl.getVideojuegos);

module.exports = router;
