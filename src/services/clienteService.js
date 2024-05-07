const pool = require('../dbconfig');
const { v4: uuidv4 } = require('uuid');

const cadastrarCliente = async (cliente) => {
    const { cpf, nome, email, dataDeNascimento, genero, rendaMensal } = cliente;
    const newId = uuidv4(); 
    const query = 'INSERT INTO clientes (id, cpf, nome, email, data_de_nascimento, genero, renda_mensal) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [newId, cpf, nome, email, dataDeNascimento, genero, rendaMensal];
    await pool.query(query, values); 
    return newId; 
};

module.exports = {
    cadastrarCliente
};
