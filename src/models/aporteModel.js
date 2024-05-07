const { v4: uuidv4 } = require('uuid');

class Aporte {
    constructor(idCliente, idPlano, valorAporte) {
        this.id = uuidv4();
        this.idCliente = idCliente;
        this.idPlano = idPlano;
        this.valorAporte = valorAporte;
    };
};

module.exports = Aporte;
