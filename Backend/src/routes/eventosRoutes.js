const router = require("express").Router();
const eventosCtr = require("../controller/eventosController");

router.get("/", eventosCtr.ListarEventosController);
router.get("/:id", eventosCtr.GetEventoByIdController);
router.post("/", eventosCtr.CrearEventoController);
router.delete("/:id", eventosCtr.EliminarEventoController);
router.put("/:id", eventosCtr.EditarEventoController);
router.patch("/:id", eventosCtr.EditarModalidadController);

module.exports = router;
