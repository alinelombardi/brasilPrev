const pool = require('../dbconfig');
const { v4: uuidv4 } = require('uuid');
const { calcularIdade } = require('../utils/validators');

const contratarPlano = async (plano) => {
    const { idCliente, idProduto, aporte, dataDaContratacao, idadeDeAposentadoria } = plano;
    const produtoQuery = 'SELECT * FROM produtos WHERE id = $1 AND expiracao_de_venda > NOW()';
    const produtoResult = await pool.query(produtoQuery, [idProduto]);

    if (!produtoResult.rows.length) {
        throw new Error('Prazo de venda do produto expirado');
    };
    
    const produto = produtoResult.rows[0];
    const clienteQuery = 'SELECT data_de_nascimento FROM clientes WHERE id = $1';
    const clienteResult = await pool.query(clienteQuery, [idCliente]);

    if (!clienteResult.rows.length) {
        throw new Error('Cliente não encontrado');
    };

    const cliente = clienteResult.rows[0];
    const dataNascimento = new Date(cliente.data_de_nascimento);
    const dataContratacao = new Date(dataDaContratacao);
    const idadeCliente = calcularIdade(dataNascimento, dataContratacao);

    if (idadeCliente < produto.idade_de_entrada) {
        throw new Error('Cliente não atende à idade mínima para contratar o plano');
    };

    if (aporte < produto.valor_minimo_aporte_inicial) {
        throw new Error('Valor do aporte é menor que o mínimo exigido pelo produto');
    };

    if (idadeDeAposentadoria < produto.idade_de_saida) {
        throw new Error('Idade de aposentadoria inválida');
    };

    const newId = uuidv4();
    const query = 'INSERT INTO planos (id, id_produto, id_cliente, aporte, data_da_contratacao, idade_de_aposentadoria, saldo) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [newId, idProduto, idCliente, aporte, dataDaContratacao, idadeDeAposentadoria, aporte];
    await pool.query(query, values);
    return newId;
};

module.exports = { contratarPlano };
