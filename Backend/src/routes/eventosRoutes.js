const router = require('express').Router();
const eventosCtr = require('../controller/eventosController');

router.get('/eventos', eventosCtr.ListarEventosController);
router.get('/eventos/:evento_id', eventosCtr.GetEventoByIdController);
router.post('/eventos', eventosCtr.CrearEventoController);
router.delete(`/eventos/:evento_id`, eventosCtr.EliminarEventoController);
router.put('/eventos/:id',eventosCtr.EditarEventoController)
module.exports = router;
