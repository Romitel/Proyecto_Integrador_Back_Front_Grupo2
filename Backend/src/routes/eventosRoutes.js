const router = require('express').Router();
const eventosCtr = require('../controller/eventosController');

router.get('/eventos', eventosCtr.ListarEventosController);
router.get('/eventos/:evento_id', eventosCtr.GetEventoByIdController);
router.post('/eventos', eventosCtr.CrearEventoController);

module.exports = router;
