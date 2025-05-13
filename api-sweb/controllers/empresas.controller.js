const { ObjectId } = require('mongodb');
const { getDB } = require('../db/db');

exports.getAll = async (req, res) => {
  const empresas = await getDB().collection('empresas').find().toArray();
  res.json(empresas);
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
