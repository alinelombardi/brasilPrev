const request = require('supertest');
const app = require('../../src/app');
const planoService = require('../../src/services/planoService');

jest.mock('../../src/services/planoService');

describe('Plano Routes', () => {
    it('Deve cadastrar um plano via rota com dados válidos', async () => {
        const novoPlano = {
            idCliente: '123456',
            idProduto: '7890',
            aporte: 1000,
            dataDaContratacao: '2024-05-07',
            idadeDeAposentadoria: 65
        };

        const idPlanoMock = 'abc123';
        planoService.contratarPlano.mockResolvedValue(idPlanoMock);

        const response = await request(app)
            .post('/plano')
            .send(novoPlano);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ id: idPlanoMock });
    });

    it('Deve retornar erro 400 ao tentar cadastrar um plano via rota com dados inválidos', async () => {
        const novoPlanoInvalido = {
            idCliente: 'invalido',
            idProduto: '7890',
            aporte: 1000,
            dataDaContratacao: '2024-05-07',
            idadeDeAposentadoria: 65
        };

        const erroEsperado = new Error('Dados de plano inválidos');
        planoService.contratarPlano.mockRejectedValue(erroEsperado);

        const response = await request(app)
            .post('/plano')
            .send(novoPlanoInvalido);

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: erroEsperado.message });
    });
});
