const eventosServ = require("../service/eventosServices");

const CrearEvento = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    await eventosServ.CrearEvento(nombre, descripcion);
    res.send(`Evento creado con exito`);
  } catch (error) {
    res.status(500).json({ error: "Algo salio mal...", error });
  }
};

const ListarEventos = async (req, res) => {
  try {
    const result = await eventosServ.ListarEventos();

    if (!result) res.status(404).send(error.message);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { CrearEvento, ListarEventos };
