const { ObjectId } = require('mongodb');
const { getDB } = require('../db/db');

exports.getAll = async (req, res) => {
    const db = getDB();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    try {
      const juegos = await db.collection('empresas')
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
      res.status(500).json({ error: 'Error al obtener las empresas', detalle: err.message });
    }
};

exports.getById = async (req, res) => {
  const empresa = await getDB().collection('empresas').findOne({ _id: new ObjectId(req.params.id) });
  res.json(empresa);
};

exports.create = async (req, res) => {
  const result = await getDB().collection('empresas').insertOne(req.body);
  res.status(201).json(result);
};

exports.update = async (req, res) => {
  const result = await getDB().collection('empresas').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(result);
};

exports.remove = async (req, res) => {
  const result = await getDB().collection('empresas').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
};

exports.getVideojuegos = async (req, res) => {
  const videojuegos = await getDB().collection('videojuegos').find({ empresaId: req.params.id }).toArray();
  res.json(videojuegos);
};

exports.addVideojuego = async (req, res) => {
  const videojuego = { ...req.body, empresaId: req.params.id };
  const result = await getDB().collection('videojuegos').insertOne(videojuego);
  res.status(201).json(result);
};

exports.updateVideojuego = async (req, res) => {
  const { videojuegoId } = req.query;
  const result = await getDB().collection('videojuegos').updateOne(
    { _id: new ObjectId(videojuegoId), empresaId: req.params.id },
    { $set: req.body }
  );
  res.json(result);
};

exports.removeVideojuego = async (req, res) => {
  const { videojuegoId } = req.query;
  const result = await getDB().collection('videojuegos').deleteOne({ _id: new ObjectId(videojuegoId), empresaId: req.params.id });
  res.json(result);
};
