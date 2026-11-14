const db = require('../../config/db');

exports.ListarEventosRepository = async () => {
  const queryText = 'SELECT * FROM convocatorias';
  const { rows } = await db.query(queryText);
  return rows;
};

exports.GetEventoByIdRepository = async evento_id => {
  const queryText = 'SELECT * FROM convocatorias WHERE id = $1';
  const { rows } = await db.query(queryText, [evento_id]);
  return rows[0] || null;
};

exports.CrearEventoRepository = async ({ disciplina, nombre, fecha, horario, lugar_direccion, 
      capacidad_maxima, minimo_para_jugar, modalidad, 
      edad_desde, edad_hasta, habilitar_invitados, notas}) => {
  const queryText = `
    INSERT INTO convocatorias (disciplina, nombre, fecha, horario, lugar_direccion, 
      capacidad_maxima, minimo_para_jugar, modalidad, 
      edad_desde, edad_hasta, habilitar_invitados, notas)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *
    `;
  console.log(`CrearEventoRepository - recibido: ${disciplina, nombre, fecha, horario, lugar_direccion, 
      capacidad_maxima, minimo_para_jugar, modalidad, 
      edad_desde, edad_hasta, habilitar_invitados, notas}`);

  const { rows } = await db.query(queryText, [disciplina, nombre, fecha, horario, lugar_direccion, 
      capacidad_maxima, minimo_para_jugar, modalidad, 
      edad_desde, edad_hasta, habilitar_invitados, notas]);
  return rows[0];
};

exports.EliminarEventoRepository = async evento_id => {
  const queryText = 'DELETE FROM convocatorias WHERE id = $1 RETURNING *';
  const { rows } = await db.query(queryText, [evento_id]);  
  return rows[0] || null;
};
exports.editarEventoRepository = async ( {id,
    disciplina,
    nombre,
    fecha,
    horario,
    lugar_direccion,
    capacidad_maxima,
    minimo_para_jugar,
    modalidad,
    edad_desde,
    edad_hasta,
    habilitar_invitados,
    notas} ) => {
  try {
    const queryText=`UPDATE convocatorias 
   SET disciplina = $1, nombre = $2, fecha = $3, horario = $4, lugar_direccion = $5, capacidad_maxima = $6, minimo_para_jugar = $7, modalidad = $8, edad_desde = $9, edad_hasta = $10, habilitar_invitados = $11, notas = $12 WHERE id = $13 RETURNING *;`
    const resp = await db.query(queryText,
[
    disciplina,
    nombre,
    fecha,
    horario,
    lugar_direccion,
    capacidad_maxima,
    minimo_para_jugar,
    modalidad,
    edad_desde,
    edad_hasta,
    habilitar_invitados,
    notas,
    parseInt(id, 10)
]
    );
    if(resp.rowCount===0){
      console.log("no existe ",id)
      console.error(`el id ${id} no existe`)
      return null
    }
    return resp.rows[0];
  } catch (error) {
    console.error("Error en editarEventoRepository:", error);
    throw error; 
  }
};

