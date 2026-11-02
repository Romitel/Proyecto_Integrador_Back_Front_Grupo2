const eventosServ = require('../service/eventosServices');

exports.ListarEventosController = async (req, res) => {
  try {
    const result = await eventosServ.ListarEventosService();

    return res.status(200).json(result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ error: error.message });
  }
};

exports.GetEventoByIdController = async (req, res) => {
  try {
    const { evento_id } = req.params;
    const result = await eventosServ.GetEventoByIdService(evento_id);

    return res.status(200).json(result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ error: error.message });
  }
};

exports.CrearEventoController = async (req, res) => {
  try {
    const { nombre, description } = req.body;
    const result = await eventosServ.CrearEventoService({
      nombre,
      description,
    });
    return res.status(201).json(result);
  } catch (error) {
    const statusCode = error.statusCode || 400;
    return res.status(statusCode).json({ error: error.message });
  }
};
