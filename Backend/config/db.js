require("colors");
const { Pool } = require("pg");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.DB_PASSWORD,
};

const db = new Pool(dbConfig);

// console.log(dbConfig);

db.connect((err, client, release) => {
  if (err) {
    return console.log("Error acquiring client", err.stack);
  }

  const url = `${db.options.host}:${db.options.port}`;
  console.log(`PostgreSQL conectado en: ${url}`.cyan.bold);
  release();
});

// db.connect()
//   .then((client) => {
// console.log(`coneccion a la base de dato exitosa`);
//     client.release();
//   })
//   .catch((err) => console.log(err.stack));

module.exports = db;
