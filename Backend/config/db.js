require("dotenv").config();

const { Pool } = require("pg");

const dbConfig = {
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.DB_PASSWORD,
};

const db = new Pool(dbConfig);

db.connect((err, client, release) => {
  if (err) {
    return console.log("Error acquiring client", err.stack);
  }

  console.log(`coneccion a la base de dato exitosa`);
  release();
});

module.exports.db = db;
