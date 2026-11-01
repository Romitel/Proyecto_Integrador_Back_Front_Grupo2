const eventosRepo = require("../repository/eventosRepository");

exports.ListarEventosService = async () => {
  try {
    const result = await eventosRepo.ListarEventosRepository();

    return result;
  } catch (err) {
    throw new Error(`Hubo un error al obtener datos`);
  }
};
