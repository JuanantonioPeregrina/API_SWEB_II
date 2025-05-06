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

    await db.collection('rawg_data').insertOne({
      query: search,
      data: games,
      createdAt: new Date()
    });

    res.status(200).json({ source: 'rawg', games });
  } catch (error) {
    console.error('🔁 Error RAWG, usando fallback:', error.message);
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
