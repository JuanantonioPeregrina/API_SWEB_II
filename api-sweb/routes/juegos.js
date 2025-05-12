const express = require('express');
const router = express.Router();
const juegosCtrl = require('../controllers/juegos.controller');

router.get('/juegos', juegosCtrl.getAll);
router.get('/juegos/:id', juegosCtrl.getById);
router.post('/juegos', juegosCtrl.create);
router.put('/juegos/:id', juegosCtrl.update);
router.delete('/juegos/:id', juegosCtrl.remove);

module.exports = router;
