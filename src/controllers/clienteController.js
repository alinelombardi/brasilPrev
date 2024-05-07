const Cliente = require('../models/clienteModel');
const clienteService = require('../services/clienteService');
const { validarCPF, validarEmail } = require('../utils/validators');

const cadastrarCliente = async (req, res) => {
    try {
        const { cpf, nome, email, dataDeNascimento, genero, rendaMensal } = req.body;
        
        if (!validarCPF(cpf)) {
            return res.status(400).json({ error: 'CPF inválido' });
        };

        if (!validarEmail(email)) {
            return res.status(400).json({ error: 'E-mail inválido' });
        };

        const cliente = new Cliente(cpf, nome, email, dataDeNascimento, genero, rendaMensal);
        const novoClienteId = await clienteService.cadastrarCliente(cliente);
        res.status(201).json({ id: novoClienteId });
    } catch (error) {
        console.error('Erro ao cadastrar o cliente:', error);
        res.status(500).json({ error: `Erro ao cadastrar o cliente: ${error.message}` });
    };
};

module.exports = {
    cadastrarCliente
};
