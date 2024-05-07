const { v4: uuidv4 } = require('uuid');

class Plano {
    constructor(idProduto, idCliente, aporte, dataDaContratacao, idadeDeAposentadoria) {
        this.id = uuidv4();
        this.idProduto = idProduto;
        this.idCliente = idCliente;
        this.aporte = aporte;
        this.dataDaContratacao = dataDaContratacao;
        this.idadeDeAposentadoria = idadeDeAposentadoria;
    };
};

module.exports = Plano;
