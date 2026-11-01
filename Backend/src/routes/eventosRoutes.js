const router = require("express").Router();
const eventosCtr = require("../controller/eventosController");

router.get("/eventos", eventosCtr.ListarEventosController);

module.exports = router;
