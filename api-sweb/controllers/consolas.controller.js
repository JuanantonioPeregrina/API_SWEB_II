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
  const consolas = await getDB().collection('consolas').find().toArray();
  res.json(consolas);
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
  const videojuegos = await getDB().collection('videojuegos').find({ consolaId: req.params.id }).toArray();
  res.json(videojuegos);
};

exports.addVideojuego = async (req, res) => {
  const videojuego = { ...req.body, consolaId: req.params.id };
  const result = await getDB().collection('videojuegos').insertOne(videojuego);
  res.status(201).json(result);
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

