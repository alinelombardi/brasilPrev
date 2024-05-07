
const Produto = require('../models/produtoModel');
const produtoService = require('../services/produtoService');

const cadastrarProduto = async (req, res) => {
    try {
        const { nome, susep, expiracaoDeVenda, valorMinimoAporteInicial, valorMinimoAporteExtra, idadeDeEntrada, idadeDeSaida, carenciaInicialDeResgate, carenciaEntreResgates } = req.body;
        const produto = new Produto(nome, susep, expiracaoDeVenda, valorMinimoAporteInicial, valorMinimoAporteExtra, idadeDeEntrada, idadeDeSaida, carenciaInicialDeResgate, carenciaEntreResgates);
        const novoProdutoId = await produtoService.cadastrarProduto(produto);
        res.status(201).json({ id: novoProdutoId });
    } catch (error) {
        console.error('Erro ao cadastrar o produto:', error);
        res.status(500).json({ error: `Erro ao cadastrar o produto: ${error.message}` });
    };
};

module.exports = {
    cadastrarProduto
};