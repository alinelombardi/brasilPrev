const { v4: uuidv4 } = require('uuid');

class Cliente {
    constructor(cpf, nome, email, dataDeNascimento, genero, rendaMensal) {
        this.id = uuidv4();
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.dataDeNascimento = dataDeNascimento;
        this.genero = genero;
        this.rendaMensal = rendaMensal;
    };
};

module.exports = Cliente;
