const Aporte = require('../models/aporteModel');
const aporteService = require('../services/aporteService');

const realizarAporte = async (req, res) => {
    try {
        const { idCliente, idPlano, valorAporte } = req.body;
        const aporte = new Aporte(idCliente, idPlano, valorAporte);
        const novoAporteId = await aporteService.realizarAporte(aporte);
        res.status(201).json({ id: novoAporteId });
    } catch (error) {
        console.error('Erro ao realizar o aporte:', error);
        res.status(500).json({ error: `Erro interno ao realizar o aporte: ${error.message}` });
    };
};

module.exports = {
    realizarAporte
};
