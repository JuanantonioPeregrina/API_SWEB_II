const express = require('express');
const axios = require('axios');
const { getDB } = require('../db');
const router = express.Router();

const API_KEY = '4b1ef09681ae49c9a70641a4cc74fef7';

router.get('/rawg/search', async (req, res) => {
  const search = req.query.query || 'zelda';
  try {
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: API_KEY,
        search
      }
    });

    const games = response.data.results;
    const db = getDB();
    const notFoundGames = [];

    // Guardar los datos crudos en la colección rawg_data
    await db.collection('rawg_data').insertOne({
      query: search,
      data: games,
      createdAt: new Date()
    });

    for (const game of games) {
      const { name, stores } = game;

      // Verificar los datos recibidos
      console.log(`Datos recibidos de RAWG para ${name}: `, stores);

      // Extraer tiendas y sus slugs, o establecer null si no hay tiendas
      const tiendas = stores && stores.length > 0 ? stores.map(store => ({
        nombre: store.store.name,
        slug: store.store.slug
      })) : null;

      console.log(`Tiendas formateadas para ${name}: `, tiendas);

      // Buscar coincidencia por nombre usando regex para ser más flexible
      const regex = new RegExp(`^${name}$`, 'i');
      const existingGame = await db.collection('videojuegos').findOne({ nombre: { $regex: regex } });

      if (existingGame) {
        console.log(`Actualizando tiendas para: ${name}`);
        console.log(`Tiendas: `, tiendas);

        await db.collection('videojuegos').updateOne(
          { _id: existingGame._id },
          {
            $set: { tiendas }
          }
        );
        console.log(`Actualizado: ${name}`);
      } else {
        console.log(`No encontrado en DB: ${name}`);
        await db.collection('videojuegos').insertOne({
          nombre: name,
          tiendas
        });
        console.log(`Nuevo documento creado para: ${name}`);
        notFoundGames.push(name);
      }
    }

    res.status(200).json({ source: 'rawg', games, notFoundGames });

  } catch (error) {
    console.error('Error RAWG, usando fallback:', error.message);
    const db = getDB();
    const fallback = await db.collection('rawg_data').findOne({ query: search });

    if (fallback) {
      res.status(200).json({ source: 'local', games: fallback.data });
    } else {
      res.status(500).json({ error: 'No se pudo obtener datos ni desde RAWG ni desde la base de datos.' });
    }
  }
});

module.exports = router;
