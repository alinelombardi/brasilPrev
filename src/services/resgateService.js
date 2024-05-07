const pool = require('../dbconfig');
const uuid = require('uuid');

const realizarResgate = async (resgate) => {
    const { idPlano, valorResgate } = resgate;
    const planoQuery = 'SELECT * FROM planos WHERE id = $1'
    const planoResult = await pool.query(planoQuery, [idPlano]);

    if (!planoResult.rows.length) {
        throw new Error('Plano não encontrado');
    };

    const plano = planoResult.rows[0];

    if (plano.saldo < valorResgate) {
        throw new Error('Saldo insuficiente para realizar o resgate');
    };

    const produtoQuery = 'SELECT * FROM produtos WHERE id = $1';
    const produtoResult = await pool.query(produtoQuery, [plano.id_produto]);
    if (!produtoResult.rows.length) {
        throw new Error('Plano não encontrado');
    };
  
    const produto = produtoResult.rows[0];
    const dataContratacao = new Date(plano.data_da_contratacao);
    const dataAtual = new Date();
    const diferencaEmDias = Math.floor((dataAtual - dataContratacao) / (1000 * 60 * 60 * 24));

    if (diferencaEmDias < produto.carencia_entre_resgates) {
        throw new Error('Período de carência ainda não foi completado para realizar o resgate');
    };

    const ultimoResgateQuery = 'SELECT MAX(data_do_resgate) AS ultimo_resgate FROM resgates WHERE id_plano = $1';
    const ultimoResgateResult = await pool.query(ultimoResgateQuery, [idPlano]);

    if (ultimoResgateResult.rows.length != 0 || ultimoResgateResult.rows[0].ultimo_resgate != null) {
        
        const ultimoResgate = new Date(ultimoResgateResult.rows[0].ultimo_resgate);
        const diferencaEntreResgates = Math.floor((dataAtual - ultimoResgate) / (1000 * 60 * 60 * 24));

        if (produto.carencia_entre_resgates > diferencaEntreResgates) {
            throw new Error('Ainda não é possível realizar outro resgate devido à carência entre resgates');
        };
    };

    const updateSaldoQuery = 'UPDATE planos SET saldo = saldo - $1 WHERE id = $2';
    await pool.query(updateSaldoQuery, [valorResgate, idPlano]);

    const newId = uuid.v4();
    const query = 'INSERT INTO resgates (id, id_plano, valor_resgate, data_do_resgate) VALUES ($1, $2, $3, $4)';
    const values = [newId, idPlano, valorResgate, new Date()];
    await pool.query(query, values);
    return newId;
};

module.exports = {
    realizarResgate
};
