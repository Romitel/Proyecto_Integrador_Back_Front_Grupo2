const eventosRepo = require("../repository/eventosRepository");

exports.ListarEventosService = async () => {
  const result = await eventosRepo.ListarEventosRepository();

  return result;
};
