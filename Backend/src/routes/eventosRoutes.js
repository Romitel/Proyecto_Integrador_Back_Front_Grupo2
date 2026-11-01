const router = require('express').Router();
const eventosCtr = require('../controller/eventosController');

router.get('/eventos', eventosCtr.ListarEventosController);
router.post('/eventos', eventosCtr.CrearEventoController);

module.exports = router;
