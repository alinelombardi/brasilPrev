const planoService = require('../services/planoService');

const cadastrarPlano = async (req, res) => {
    try {
        const novoPlano = req.body;
        const novoPlanoId = await planoService.contratarPlano(novoPlano);
        res.status(201).json({ id: novoPlanoId });
    } catch (error) {
        console.error('Erro ao cadastrar o plano:', error);
        if (error.message === 'Dados de plano inválidos') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: `Erro ao cadastrar o plano: ${error.message}` });
        }
    }
};

module.exports = { 
    cadastrarPlano
 };