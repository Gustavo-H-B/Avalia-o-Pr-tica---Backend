const express = require("express");
const router = express.Router();

const categoriasController = require("../controllers/categoriasController");

router.get("/", categoriasController.listarCategorias);
router.get("/:id", categoriasController.procurarIdCategoria);
router.post("/", categoriasController.cadastrarCategoria);
router.put("/:id", categoriasController.atualizarCategoria);
router.delete("/:id", categoriasController.deletarCategoria);

module.exports = router;