const { v4: uuidv4 } = require('uuid');

class Produto {
    constructor(nome, susep, expiracaoDeVenda, valorMinimoAporteInicial, valorMinimoAporteExtra, idadeDeEntrada, idadeDeSaida, carenciaInicialDeResgate, carenciaEntreResgates) {
        this.id = uuidv4();
        this.nome = nome;
        this.susep = susep;
        this.expiracaoDeVenda = expiracaoDeVenda;
        this.valorMinimoAporteInicial = valorMinimoAporteInicial;
        this.valorMinimoAporteExtra = valorMinimoAporteExtra;
        this.idadeDeEntrada = idadeDeEntrada;
        this.idadeDeSaida = idadeDeSaida;
        this.carenciaInicialDeResgate = carenciaInicialDeResgate;
        this.carenciaEntreResgates = carenciaEntreResgates;
    };
};

module.exports = Produto;
