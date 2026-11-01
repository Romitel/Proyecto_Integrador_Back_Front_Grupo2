const eventosRepo = require('../repository/eventosRepository');

exports.ListarEventosService = async () => {
  try {
    const result = await eventosRepo.ListarEventosRepository();

    return result;
  } catch (err) {
    throw new Error(`Hubo un error al obtener datos`);
  }
};

exports.CrearEventoService = async ({ nombre, description }) => {
  try {
    const response = await eventosRepo.CrearEventoRepository({
      nombre,
      description,
    });
    return response;
  } catch (error) {
    throw new Error('No se pudo crear el evento');
  }
};
