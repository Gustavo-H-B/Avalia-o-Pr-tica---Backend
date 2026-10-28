const express = require("express");
const router = express.Router();

const produtosController = require("../controllers/produtosController");

router.get("/", produtosController.listarProdutos);
router.get("/estoque/:id", produtosController.listarEstoque);
router.get("/:id", produtosController.procurarIdProduto);
router.post("/", produtosController.cadastrarProduto);
router.put("/:id", produtosController.atualizarProduto);
router.delete("/:id", produtosController.deletarProduto);

module.exports = router;