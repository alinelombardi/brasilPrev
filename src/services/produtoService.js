const pool = require('../dbconfig');
const uuid = require('uuid');

const cadastrarProduto = async (produto) => {
    const { nome, susep, expiracaoDeVenda, valorMinimoAporteInicial, valorMinimoAporteExtra, idadeDeEntrada, idadeDeSaida, carenciaInicialDeResgate, carenciaEntreResgates } = produto;
    const dataAtual = new Date();
    const expiracaoVenda = new Date(expiracaoDeVenda);
    if (expiracaoVenda <= dataAtual) {
        throw new Error('Prazo de venda expirado');
    };

    if (valorMinimoAporteInicial < 0 || valorMinimoAporteExtra < 0) {
        throw new Error('Valores mínimos de aporte inválidos');
    };

    if (idadeDeEntrada >= idadeDeSaida) {
        throw new Error('Idade de entrada deve ser menor que idade de saída');
    };

    if (carenciaInicialDeResgate < 0 || carenciaEntreResgates < 0) {
        throw new Error('Configuração de carência inválida');
    };

    const newId = uuid.v4();
    const query = 'INSERT INTO produtos (id, nome, susep, expiracao_de_venda, valor_minimo_aporte_inicial, valor_minimo_aporte_extra, idade_de_entrada, idade_de_saida, carencia_inicial_de_resgate, carencia_entre_resgates) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id';
    const values = [newId, nome, susep, expiracaoDeVenda, valorMinimoAporteInicial, valorMinimoAporteExtra, idadeDeEntrada, idadeDeSaida, carenciaInicialDeResgate, carenciaEntreResgates];
    const result = await pool.query(query, values);
    return newId;
};

module.exports = {
    cadastrarProduto
};
