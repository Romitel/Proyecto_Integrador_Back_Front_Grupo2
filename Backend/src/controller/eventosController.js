const eventosServ = require("../service/eventosServices");

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
    const { id } = req.params;
    const result = await eventosServ.GetEventoByIdService(id);

    return res.status(200).json(result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ error: error.message });
  }
};

exports.CrearEventoController = async (req, res) => {
  try {
    const {
      disciplina,
      nombre,
      fecha,
      horario,
      lugar_direccion,
      capacidad_maxima,
      minimo_para_jugar,
      modalidad,
      edad_desde,
      edad_hasta,
      habilitar_invitados,
      notas,
    } = req.body;
    const result = await eventosServ.CrearEventoService({
      disciplina,
      nombre,
      fecha,
      horario,
      lugar_direccion,
      capacidad_maxima,
      minimo_para_jugar,
      modalidad,
      edad_desde,
      edad_hasta,
      habilitar_invitados,
      notas,
    });
    return res.status(201).json(result);
  } catch (error) {
    const statusCode = error.statusCode || 400;
    return res.status(statusCode).json({ error: error.message });
  }
};

exports.EliminarEventoController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await eventosServ.EliminarEventoService(id);
    return res.status(200).json(result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ error: error.message });
  }
};

exports.EditarEventoController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      disciplina,
      nombre,
      fecha,
      horario,
      lugar_direccion,
      capacidad_maxima,
      minimo_para_jugar,
      modalidad,
      edad_desde,
      edad_hasta,
      habilitar_invitados,
      notas,
    } = req.body;
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "El id ingresado no es válido" });
    }
    const result = await eventosServ.EditarEventoService({
      id,
      disciplina,
      nombre,
      fecha,
      horario,
      lugar_direccion,
      capacidad_maxima,
      minimo_para_jugar,
      modalidad,
      edad_desde,
      edad_hasta,
      habilitar_invitados,
      notas,
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.EditarModalidadController = async (req, res) => {
  try {
    const { id } = req.params;
    const { modalidad } = req.body;
    const result = await eventosServ.EditarModalidadService({ id, modalidad });

    res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};
