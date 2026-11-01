const eventosServ = require("../service/eventosServices");

exports.ListarEventosController = async (req, res) => {
  try {
    const result = await eventosServ.ListarEventosService();

    if (!result) res.status(404).send(error.message);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
