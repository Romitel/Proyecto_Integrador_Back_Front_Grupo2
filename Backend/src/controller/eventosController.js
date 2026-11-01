const eventosServ = require('../service/eventosServices');

exports.ListarEventosController = async (req, res) => {
  try {
    const result = await eventosServ.ListarEventosService();

    if (!result) res.status(404).send(error.message);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.CrearEventoController = async (req, res) => {
  try {
    const { nombre, description } = req.body;
    const evento = await eventosServ.CrearEventoService({
      nombre,
      description,
    });
    res.status(201).send(evento);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
