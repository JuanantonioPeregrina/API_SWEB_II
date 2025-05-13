const express = require('express');
const router = express.Router();
const empresasCtrl = require('../controllers/empresas.controller');

router.get('/empresas', empresasCtrl.getAll);
router.post('/empresas', empresasCtrl.create);
router.get('/empresas/:id', empresasCtrl.getById);
router.put('/empresas/:id', empresasCtrl.update);
router.delete('/empresas/:id', empresasCtrl.remove);
router.get('/empresas/:id/videojuegos', empresasCtrl.getVideojuegos);

module.exports = router;