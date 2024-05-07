const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return false; 

    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = (resto >= 10) ? 0 : resto;

    if (parseInt(cpf.charAt(9)) !== digitoVerificador1) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = (resto >= 10) ? 0 : resto;

    if (parseInt(cpf.charAt(10)) !== digitoVerificador2) return false;
    return true;
};

const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const calcularIdade = (dataNascimento, dataContratacao) => {
    const nascimento = new Date(dataNascimento);
    const contratacao = new Date(dataContratacao);

    let idade = contratacao.getFullYear() - nascimento.getFullYear();
    const mesContratacao = contratacao.getMonth();
    const diaContratacao = contratacao.getDate();
    const mesNascimento = nascimento.getMonth();
    const diaNascimento = nascimento.getDate();

    if (mesContratacao < mesNascimento || (mesContratacao === mesNascimento && diaContratacao < diaNascimento)) {
        if (idade === 0) {
        return idade;
        } else{
            return idade -1
        }
    } else {
        return idade;
    };
};


module.exports = {
    validarCPF,
    validarEmail,
    calcularIdade
};
