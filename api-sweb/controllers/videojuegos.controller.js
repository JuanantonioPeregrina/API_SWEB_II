const { ObjectId } = require('mongodb');
const { getDB } = require('../db/db');

exports.getAll = async (req, res) => {
  const db = getDB();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  try {
    const juegos = await db.collection('videojuegos')
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
    res.status(500).json({ error: 'Error al obtener los videojuegos', detalle: err.message });
  }
};

exports.getById = async (req, res) => {
  const juego = await getDB().collection('videojuegos').findOne({ _id: new ObjectId(req.params.id) });
  res.json(juego);
};

exports.create = async (req, res) => {
  const result = await getDB().collection('videojuegos').insertOne(req.body);
  res.status(201).json(result);
};

exports.update = async (req, res) => {
  const result = await getDB().collection('videojuegos').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(result);
};

exports.remove = async (req, res) => {
  const result = await getDB().collection('videojuegos').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
};