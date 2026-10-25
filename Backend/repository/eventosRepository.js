const dotenv = require("dotenv");
const { db } = require("../config/db");

dotenv.config();

const createEvent = async (name, description) => {
  try {
    const result = await db.query(
      "INSERT INTO eventos (nombre, description) VALUES ($1, $2)",
      [name, description],
    );
    console.log("El evento se ha creado con exito");
    return console.log(result.rowCount);
  } catch (err) {
    console.error(err);
  }
};

createEvent("Del Siglo", "Descripcion del evento del siglo");

const deleteEvent = async (id) => {
  try {
    await db.query("DELETE FROM eventos WHERE id = ?", [Number(id)]);
    console.log("Se borro con exito la tabla");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createEvent, deleteEvent };
