const express = require('express');
const router = express.Router();
const videojuegosCtrl = require('../controllers/videojuegos.controller');

router.get('/videojuegos', videojuegosCtrl.getAll);
router.post('/videojuegos', videojuegosCtrl.create);
router.get('/videojuegos/:id', videojuegosCtrl.getById);
router.put('/videojuegos/:id', videojuegosCtrl.update);
router.delete('/videojuegos/:id', videojuegosCtrl.remove);

module.exports = router;