const eventosRepo = require("../repository/eventosRepository");

const CrearEvento = async (nombre, descripcion) => {
  const data = {
    nombre,
    descripcion,
  };

  await eventosRepo.CrearEvento(data);
};

const ListarEventos = async () => {
  const result = await eventosRepo.ListarEventos();

  return result;
};

module.exports = { CrearEvento, ListarEventos };
