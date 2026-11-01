const dotenv = require("dotenv");
const db = require("../../config/db");

dotenv.config();

exports.ListarEventosRepository = async () => {
  const { rows } = await db.query("SELECT * FROM eventos");
  return rows;
};
