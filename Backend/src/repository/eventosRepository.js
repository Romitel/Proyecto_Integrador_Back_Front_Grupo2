const db = require("../../config/db");

exports.ListarEventosRepository = async () => {
  const { rows } = await db.query("SELECT * FROM eventos");
  return rows;
};
