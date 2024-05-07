
const Resgate = require('../models/resgateModel');
const resgateService = require('../services/resgateService');

const realizarResgate = async (req, res) => {
    try {
        const { idPlano, valorResgate } = req.body;
        const resgate = new Resgate(idPlano, valorResgate);
        const novoResgateId = await resgateService.realizarResgate(resgate);
        res.status(201).json({ id: novoResgateId });
    } catch (error) {
        console.error('Erro ao realizar o resgate:', error);
        res.status(500).json({ error: `Erro ao realizar o resgate: ${error.message}` });
    }
};

module.exports = {
    realizarResgate
};
