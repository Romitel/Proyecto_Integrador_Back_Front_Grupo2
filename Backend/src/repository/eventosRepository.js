const db = require('../../config/db');

exports.ListarEventosRepository = async () => {
  const queryText = 'SELECT * FROM eventos';
  const { rows } = await db.query(queryText);
  return rows;
};

exports.GetEventoByIdRepository = async evento_id => {
  const queryText = 'SELECT * FROM eventos WHERE id = $1';
  const { rows } = await db.query(queryText, [evento_id]);
  return rows[0] || null;
};

exports.CrearEventoRepository = async ({ nombre, description }) => {
  const queryText = `
    INSERT INTO eventos (nombre, description)
    VALUES ($1, $2)
    RETURNING *
    `;
  console.log(`CrearEventoRepository - recibido: ${nombre}, ${description}`);

  const { rows } = await db.query(queryText, [nombre, description]);
  return rows[0];
};
