const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'api_SWEB_II';

let db;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log('Conectado a MongoDB');
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
