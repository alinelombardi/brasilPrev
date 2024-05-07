const pool = require('../dbconfig');
const uuid = require('uuid');

const realizarAporte = async (aporte) => {
    const { idCliente, idPlano, valorAporte } = aporte;
    const planoQuery = 'SELECT * FROM planos WHERE id = $1';
    const planoResult = await pool.query(planoQuery, [idPlano]);

    if (!planoResult.rows.length) {
        throw new Error('Plano não encontrado');
    };
    
    const plano = planoResult.rows[0];
    const produtoQuery = 'SELECT * FROM produtos WHERE id = $1';
    const produtoResult = await pool.query(produtoQuery, [plano.id_produto]);

    if (!produtoResult.rows.length) {
        throw new Error('Produto não encontrado');
    };

    const produto = produtoResult.rows[0];

    if (valorAporte < produto.valor_minimo_aporte_extra) {
        throw new Error('Valor do aporte é menor que o mínimo exigido pelo produto');
    };

    const updateQuery = 'UPDATE planos SET saldo = saldo + $1 WHERE id = $2';
    await pool.query(updateQuery, [valorAporte, idPlano]);
    const newId = uuid.v4();
    const query = 'INSERT INTO aportes (id, id_cliente, id_plano, aporte) VALUES ($1, $2, $3, $4)';
    const values = [newId, idCliente, idPlano, valorAporte];
    await pool.query(query, values);
    return newId;
};

module.exports = {
    realizarAporte
};
