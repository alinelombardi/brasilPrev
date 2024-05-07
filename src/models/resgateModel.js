const { v4: uuidv4 } = require('uuid');

class Resgate {
    constructor(idPlano, valorResgate) {
        this.id = uuidv4();
        this.idPlano = idPlano;
        this.valorResgate = valorResgate;
    };
};

module.exports = Resgate;
