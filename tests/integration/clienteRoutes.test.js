const request = require('supertest');
const app = require('../../src/app');
const clienteService = require('../../src/services/clienteService');
const { validarCPF, validarEmail } = require('../../src/utils/validators');

jest.mock('../../src/services/clienteService');
jest.mock('../../src/utils/validators');

describe('Cliente Routes', () => {
    test('Deve cadastrar um cliente via rota com dados válidos', async () => {
        const novoCliente = {
            cpf: '12345678900',
            nome: 'Fulano de Tal',
            email: 'fulano@cliente.com',
            dataDeNascimento: '1990-01-01T00:00:00.000Z',
            genero: 'Masculino',
            rendaMensal: 3000.0
        };
        const idClienteMock = 'abc123';

        clienteService.cadastrarCliente.mockResolvedValue(idClienteMock);
        validarCPF.mockReturnValue(true);
        validarEmail.mockReturnValue(true);

        const response = await request(app)
            .post('/cliente')
            .send(novoCliente);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ id: idClienteMock });
    });

    test('Deve retornar erro 400 ao tentar cadastrar um cliente via rota com CPF inválido', async () => {
        const novoCliente = {
            cpf: '12345678901',
            nome: 'Fulano de Tal',
            email: 'fulano@cliente.com',
            dataDeNascimento: '1990-01-01T00:00:00.000Z',
            genero: 'Masculino',
            rendaMensal: 3000.0
        };

        validarCPF.mockReturnValue(false);

        const response = await request(app)
            .post('/cliente')
            .send(novoCliente);

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'CPF inválido' });
    });

    test('Deve retornar erro 400 ao tentar cadastrar um cliente via rota com e-mail inválido', async () => {
        const novoCliente = {
            cpf: '12345678900',
            nome: 'Fulano de Tal',
            email: 'fulanocliente.com',
            dataDeNascimento: '1990-01-01T00:00:00.000Z',
            genero: 'Masculino',
            rendaMensal: 3000.0
        };

        validarCPF.mockReturnValue(true);
        validarEmail.mockReturnValue(false);

        const response = await request(app)
            .post('/cliente')
            .send(novoCliente);

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'E-mail inválido' });
    });
});
