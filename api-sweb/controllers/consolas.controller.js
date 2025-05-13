const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db/db');

exports.getConsolasDesdeXML = async (req, res) => {
  const filePath = path.join(__dirname, '../data/consolas.xml');
  const parser = new xml2js.Parser();

  try {
    const xml = fs.readFileSync(filePath, 'utf-8');
    const result = await parser.parseStringPromise(xml);
    const consolas = result.consolas.consola.map(t => ({
      nombre: t.nombre[0],
      slug: t.slug[0]
    }));

    // Guardarlas en MongoDB si aún no existen
    const db = getDB();
    for (const consola of consolas) {
      const yaExiste = await db.collection('consolas').findOne({ slug: consola.slug });
      if (!yaExiste) {
        await db.collection('consolas').insertOne(consola);
      }
    }

    res.status(200).json({ source: 'xml', consolas });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo procesar consolas.xml' });
  }

};

exports.getAll = async (req, res) => {
  const db = getDB();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  try {
    const juegos = await db.collection('consolas')
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    res.status(200).json({
      page,
      limit,
      total: juegos.length,
      data: juegos
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las consolas', detalle: err.message });
  }
};

exports.getById = async (req, res) => {
  const consola = await getDB().collection('consolas').findOne({ _id: new ObjectId(req.params.id) });
  res.json(consola);
};

exports.create = async (req, res) => {
  const result = await getDB().collection('consolas').insertOne(req.body);
  res.status(201).json(result);
};

exports.update = async (req, res) => {
  const result = await getDB().collection('consolas').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(result);
};

exports.remove = async (req, res) => {
  const result = await getDB().collection('consolas').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
};

exports.getVideojuegos = async (req, res) => {
  const db = getDB();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  try {
    const consola = await db.collection('consolas').findOne({ _id: new ObjectId(req.params.id) });

    if (!consola || !Array.isArray(consola.videojuegos_compatibles)) {
        return res.status(404).json({ error: 'Consola no encontrada o sin juegos compatibles' });
    }
    const total = consola.videojuegos_compatibles.length;

    const juegos = await db.collection('videojuegos')
      .find({ dispositivo: consola.nombre })
      .skip(skip)
      .limit(limit)
      .toArray();

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: juegos
    });

  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las consolas', detalle: err.message });
  }
};

exports.addVideojuego = async (req, res) => {
  const { consolaId, videojuegoId } = req.params;

  try {
    const db = getDB();

    const juego = await db.collection('videojuegos').findOne({ _id: new ObjectId(videojuegoId) });
    if (!juego) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }

    // 2. Añadir el nombre del videojuego al array de la consola
    const result = await db.collection('consolas').updateOne(
      { _id: new ObjectId(consolaId) },
      { $addToSet: { videojuegos_compatibles: juego.nombre } }
    );

    res.status(201).json({
      message: `Videojuego "${juego.nombre}" añadido a la consola`,
      result
    });

  } catch (err) {
    res.status(500).json({ error: 'Error al añadir videojuego', detalle: err.message });
  }
};


exports.updateVideojuego = async (req, res) => {
  const { videojuegoId } = req.query;
  const result = await getDB().collection('videojuegos').updateOne(
    { _id: new ObjectId(videojuegoId), consolaId: req.params.id },
    { $set: req.body }
  );
  res.json(result);
};

exports.removeVideojuego = async (req, res) => {
  const { videojuegoId } = req.query;
  const result = await getDB().collection('videojuegos').deleteOne({ _id: new ObjectId(videojuegoId), consolaId: req.params.id });
  res.json(result);
};