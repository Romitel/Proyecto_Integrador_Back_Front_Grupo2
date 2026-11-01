const db = require('../../config/db');

exports.ListarEventosRepository = async () => {
  const { rows } = await db.query('SELECT * FROM eventos');
  return rows;
};

exports.CrearEventoRepository = async ({ nombre, description }) => {
  console.log(`CrearEventoRepository - recibido: ${nombre}, ${description}`);

  const { rows } = await db.query(
    'INSERT INTO eventos (nombre, description) VALUES ($1, $2) RETURNING *',
    [nombre, description],
  );
  return rows[0];
};
