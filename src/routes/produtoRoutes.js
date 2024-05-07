const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/', produtoController.cadastrarProduto);

module.exports = router;
