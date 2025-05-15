const axios = require('axios');
const { getDB } = require('../db/db');

const API_KEY = '4b1ef09681ae49c9a70641a4cc74fef7';

exports.searchAndSyncGames = async (req, res) => {
  const search = req.query.query || 'zelda';

  //Si cambiamos esto por lo siguiente
  try {
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: { key: API_KEY, search }
    });
/*
Simula la caída de la API externa
throw new Error('Simulando la caída de la API RAWG'); */

    
const games = response.data.results;
const db = getDB();
const notFoundGames = [];
const processedGames = [];

for (const game of games) {
  const { name, stores } = game;

  // Extraer tiendas o dejarlo como null si no hay datos
  const tiendas = stores?.length > 0
    ? stores.map(store => ({
        nombre: store.store.name,
        slug: store.store.slug
      }))
    : null;

  // Buscar el videojuego en la base de datos
  const regex = new RegExp(`^${name}$`, 'i');
  const existingGame = await db.collection('videojuegos').findOne({ nombre: { $regex: regex } });

  if (existingGame) {
    // Actualizar el campo tiendas
    await db.collection('videojuegos').updateOne(
      { _id: existingGame._id },
      { $set: { tiendas } }
    );
    console.log(`Actualizado: ${name}`);
  } else {
    // Insertar nuevo documento si no existe
    await db.collection('videojuegos').insertOne({ nombre: name, tiendas });
    console.log(`Nuevo documento creado para: ${name}`);
    notFoundGames.push(name);
  }

  // Almacenar los juegos procesados para la respuesta
  processedGames.push({ nombre: name, tiendas });
}

res.status(200).json({
  source: 'rawg',
  games: processedGames,
  notFoundGames
});

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
