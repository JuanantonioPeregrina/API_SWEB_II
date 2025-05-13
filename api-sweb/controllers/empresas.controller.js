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
  const db = getDB();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  try {
    const empresa = await db.collection('empresas').findOne({ _id: new ObjectId(req.params.id) });

    if (!empresa) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }
    const total = await db.collection('videojuegos').countDocuments({ empresa: empresa.nombre });
    console.log(total)
    const juegos = await db.collection('videojuegos')
      .find({ empresa: empresa.nombre })
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
    res.status(500).json({ error: 'Error al obtener las empresas', detalle: err.message });
  }
};
exports.addVideojuego = async (req, res) => {
  const { empresaId, consolaId } = req.params;

  try {
    const db = getDB();

    const consola = await db.collection('consolas').findOne({ _id: new ObjectId(consolaId) });
    if (!consola) {
      return res.status(404).json({ error: 'Consola no encontrada' });
    }

    const result = await db.collection('empresas').updateOne(
      { _id: new ObjectId(empresaId) },
      { $addToSet: { consolas_compatibles: consola.nombre } }
    );

    res.status(201).json({
      message: `Consola "${consola.nombre}" añadido a la empresa`,
      result
    });

  } catch (err) {
    res.status(500).json({ error: 'Error al añadir la consola', detalle: err.message });
  }
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