const clienteController = require('../../src/controllers/clienteController');
const clienteService = require('../../src/services/clienteService');
const { validarCPF, validarEmail } = require('../../src/utils/validators');

jest.mock('../../src/services/clienteService');
jest.mock('../../src/utils/validators');

describe('Cliente Controller', () => {
    test('Deve cadastrar um cliente com dados válidos', async () => {
        const req = {
            body: {
                cpf: '12345678900',
                nome: 'Fulano de Tal',
                email: 'fulano@cliente.com',
                dataDeNascimento: '1990-01-01T00:00:00.000Z',
                genero: 'Masculino',
                rendaMensal: 3000.0
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const idClienteMock = 'abc123';

        clienteService.cadastrarCliente.mockResolvedValue(idClienteMock);
        validarCPF.mockReturnValue(true);
        validarEmail.mockReturnValue(true);

        await clienteController.cadastrarCliente(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: idClienteMock });
    });

    test('Deve retornar erro 400 ao tentar cadastrar um cliente com CPF inválido', async () => {
        const req = {
            body: {
                cpf: '12345678901',
                nome: 'Fulano de Tal',
                email: 'fulano@cliente.com',
                dataDeNascimento: '1990-01-01T00:00:00.000Z',
                genero: 'Masculino',
                rendaMensal: 3000.0
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        validarCPF.mockReturnValue(false);

        await clienteController.cadastrarCliente(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'CPF inválido' });
    });

    test('Deve retornar erro 400 ao tentar cadastrar um cliente com e-mail inválido', async () => {
        const req = {
            body: {
                cpf: '12345678900',
                nome: 'Fulano de Tal',
                email: 'fulanocliente.com',
                dataDeNascimento: '1990-01-01T00:00:00.000Z',
                genero: 'Masculino',
                rendaMensal: 3000.0
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        validarCPF.mockReturnValue(true);
        validarEmail.mockReturnValue(false);

        await clienteController.cadastrarCliente(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'E-mail inválido' });
    });
});