const dotenv = require("dotenv");
const db = require("../config/db");

dotenv.config();

const CrearEvento = async (data) => {
  const { nombre, descripcion } = data;

  await db.query("INSERT INTO eventos (nombre, description) VALUES ($1, $2)", [
    nombre,
    descripcion,
  ]);
};

const ListarEventos = async () => {
  const { rows } = await db.query("SELECT * FROM eventos");
  return rows;
};

const deleteEvent = async (id) => {
  try {
    await db.query("DELETE FROM eventos WHERE id = ?", [Number(id)]);
    console.log("Se borro con exito la tabla");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { CrearEvento, ListarEventos, deleteEvent };
