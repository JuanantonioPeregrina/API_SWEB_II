const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
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

exports.getJuegosPorConsola = async (req, res) => {
    const db = getDB();
    const slug = req.params.slug;
  
    try {
      const juegos = await db.collection('videojuegos').find({
        consolas: slug
      }).toArray();
  
      if (juegos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron juegos para esta consola.' });
      }
  
      res.status(200).json(juegos);
    } catch (err) {
      res.status(500).json({ error: 'Error al buscar juegos por consola.', detalles: err.message });
    }
  };
