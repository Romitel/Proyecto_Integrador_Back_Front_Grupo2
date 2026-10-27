const router = require("express").Router();
const eventosCtr = require("../controller/eventosController");

router.get("/eventos", eventosCtr.ListarEventos);
router.post("/eventos", eventosCtr.CrearEvento);

module.exports = router;
