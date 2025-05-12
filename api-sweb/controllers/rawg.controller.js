const axios = require('axios');
const { getDB } = require('../db/db');

const API_KEY = '4b1ef09681ae49c9a70641a4cc74fef7';

exports.searchAndSyncGames = async (req, res) => {
  const search = req.query.query || 'zelda';

  try {
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: { key: API_KEY, search }
    });

    const games = response.data.results;
    const db = getDB();
    const notFoundGames = [];

    await db.collection('rawg_data').insertOne({
      query: search,
      data: games,
      createdAt: new Date()
    });

    for (const game of games) {
      const { name, stores } = game;

      const tiendas = stores?.length > 0
        ? stores.map(store => ({
            nombre: store.store.name,
            slug: store.store.slug
          }))
        : null;

        const consolas = games.platforms?.length > 0
    ? games.platforms.map(p => p.platform.slug)
    : [];

      const regex = new RegExp(`^${name}$`, 'i');
      const existingGame = await db.collection('rawg').findOne({ nombre: { $regex: regex } });

      if (existingGame) {
        await db.collection('rawg').updateOne(
          { _id: existingGame._id },
          { $set: { tiendas, consolas } }
        );
      } else {
        await db.collection('rawg').insertOne({ nombre: name, tiendas });
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
};
