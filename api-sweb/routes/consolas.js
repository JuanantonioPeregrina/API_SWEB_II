const express = require('express');
const router = express.Router();
const consolasCtrl = require('../controllers/consolas.controller');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db/db');

router.get('/consolas/xml', consolasCtrl.getConsolasDesdeXML);
router.get('/consolas', consolasCtrl.getAll);
router.post('/consolas', consolasCtrl.create);
router.get('/consolas/:id', consolasCtrl.getById);
router.put('/consolas/:id', consolasCtrl.update);
router.delete('/consolas/:id', consolasCtrl.remove);
router.get('/consolas/:consolaId/videojuegos/:videojuegoId', consolasCtrl.getVideojuegos);
router.post('/consolas/:consolaId/videojuegos/:videojuegoId', consolasCtrl.addVideojuego);
router.put('/consolas/:consolaId/videojuegos/:videojuegoOldId/:videojuegoId', consolasCtrl.updateVideojuego);
router.delete('/consolas/:consolaId/videojuegos/:videojuegoId', consolasCtrl.removeVideojuego);

// Ruta GET /consolas/:id/videojuegos
router.get('/consolas/:id/videojuegos', async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
  
    try {
      const db = getDB();
  
      // Convertir el id a ObjectId
      const consola = await db.collection('consolas').findOne({ _id: new ObjectId(id) });
  
      if (!consola) {
        return res.status(404).json({ error: 'Consola no encontrada' });
      }
  
      const videojuegos = await db.collection('videojuegos').find({
        dispositivo: consola.nombre
      }).skip(skip).limit(parseInt(limit)).toArray();
  
      res.json({ page, limit, total: videojuegos.length, data: videojuegos });
  
    } catch (error) {
      console.error('Error al obtener videojuegos de la consola:', error.message);
      res.status(500).json({ error: 'Error al obtener videojuegos de la consola' });
    }
  });
  
  
  // Ruta POST /consolas/:consolaId/videojuegos/:videojuegoId
  router.post('/consolas/:consolaId/videojuegos/:videojuegoId', async (req, res) => {
    const { consolaId, videojuegoId } = req.params;
  
    try {
      const db = getDB();
      const consola = await db.collection('consolas').findOne({ _id: consolaId });
      const videojuego = await db.collection('videojuegos').findOne({ _id: videojuegoId });
  
      if (!consola || !videojuego) {
        return res.status(404).json({ error: 'Consola o videojuego no encontrado' });
      }
  
      await db.collection('consolas').updateOne(
        { _id: consolaId },
        { $addToSet: { videojuegos_compatibles: videojuego.nombre } }
      );
  
      res.json({ message: `Videojuego ${videojuego.nombre} añadido a la consola ${consola.nombre}` });
    } catch (error) {
      console.error('Error al añadir videojuego a consola:', error);
      res.status(500).json({ error: 'Error al añadir videojuego a consola' });
    }
  });
module.exports = router;
