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
