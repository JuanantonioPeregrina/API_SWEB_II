const { ObjectId } = require('mongodb');
const { getDB } = require('../db/db');

exports.getAll = async (req, res) => {
  const juegos = await getDB().collection('videojuegos').find().toArray();
  res.json(juegos);
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
