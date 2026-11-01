const eventosServ = require("../service/eventosServices");

exports.ListarEventosController = async (req, res) => {
  try {
    const result = await eventosServ.ListarEventosService();

    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
