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

exports.EliminarEventoRepository = async evento_id => {
  const queryText = 'DELETE FROM eventos WHERE id = $1 RETURNING *';
  const { rows } = await db.query(queryText, [evento_id]);  
  return rows[0] || null;
};

exports.editarEventoRepository = async ( {id, nombre, description} ) => {
  try {
    const resp = await db.query(
      'UPDATE eventos SET nombre = $1, description = $2, creadoen = now() WHERE id = $3 RETURNING *;',
      [nombre, description, parseInt(id)]
    );
    if(resp.rowCount===0){
      console.error(`el id ${id} no existe`)
      return null
    }
    return resp.rows[0];
  } catch (error) {
    console.error("Error en editarEventoRepository:", error);
    throw error; 
  }
};

