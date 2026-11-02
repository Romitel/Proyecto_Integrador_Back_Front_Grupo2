const eventosRepo = require('../repository/eventosRepository');

exports.ListarEventosService = async () => {
  try {
    const eventos = await eventosRepo.ListarEventosRepository();
    return eventos;
  } catch (error) {
    throw new Error(`Hubo un error al obtener datos: ${error.message}`);
  }
};

exports.GetEventoByIdService = async evento_id => {
  if (!evento_id) throw new Error('El ID del evento es requerido');
  try {
    const evento = await eventosRepo.GetEventoByIdRepository(evento_id);
    if (!evento) {
      const error = new Error('El evento solicitado no existe');
      error.statusCode = 404;
      throw error;
    }
    return evento;
  } catch (error) {
    if (error.statusCode) throw error;
    throw new Error(`Hubo un error al obtener datos: ${error.message}`);
  }
};

exports.CrearEventoService = async ({ nombre, description }) => {
  if (!nombre || nombre.trim() === '')
    throw new Error('El nombre del evento es obligatorio');
  try {
    const evento = await eventosRepo.CrearEventoRepository({
      nombre: nombre.trim(),
      description: description ? description.trim() : null,
    });
    return evento;
  } catch (error) {
    throw new Error(`No se pudo crear el evento: ${error.message}`);
  }
};

exports.EliminarEventoService = async evento_id => {
  if(!evento_id){
    const error =new Error('El ID del evento es requerido');
    error.statusCode = 400;
    throw error;
  }
  try {
    const evento = await eventosRepo.EliminarEventoRepository(evento_id);
    if(!evento){
      const error = new Error('El evento solicitado no existe');
      error.statusCode = 404;
      throw error;
    }
    return { mensaje: 'Evento eliminado correctamente', data: evento };
  } catch (error) {
    if (error.statusCode) throw error;
    throw new Error(`Hubo un error al eliminar el evento: ${error.message}`);
  }
};
exports.EditarEventoService=async({id,nombre,description})=>{
  try {
    const response=await eventosRepo.editarEventoRepository(
      {id,nombre,description}
    )
    return response
  } catch (error) {
    console.error("error al editar en eventoService",error)
    throw new Error("El evento no se actualizó!")    
  }
}
