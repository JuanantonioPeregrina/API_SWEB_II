const fs = require('fs');
const path = require('path');
const { connectDB } = require('../db/db');

async function loadData() {
  try {
    const db = await connectDB();

    const videojuegos = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/Videojuegos_Completos_Actualizados.json')));
    const consolas = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/Consolas_Videojuegos_Actualizado.json')));
    const empresas = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/Empresas_Videojuegos_Final.json')));

    await db.collection('videojuegos').deleteMany({});
    await db.collection('consolas').deleteMany({});
    await db.collection('empresas').deleteMany({});

    await db.collection('videojuegos').insertMany(videojuegos);
    await db.collection('consolas').insertMany(consolas);
    await db.collection('empresas').insertMany(empresas);

    console.log(' Datos cargados correctamente en MongoDB.');
    process.exit();
  } catch (err) {
    console.error('Error al cargar datos:', err);
    process.exit(1);
  }
}

loadData();
