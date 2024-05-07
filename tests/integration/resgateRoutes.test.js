const request = require('supertest');
const app = require('../../src/app');
const resgateService = require('../../src/services/resgateService');

jest.mock('../../src/services/resgateService');

describe('Resgate Routes', () => {
    test('Deve realizar um resgate via rota com dados válidos', async () => {
        const novoResgate = {
            idPlano: '123abc',
            valorResgate: 1000.0
        };
        const erroEsperado = 'Erro de exemplo';
        resgateService.realizarResgate.mockRejectedValue(new Error(erroEsperado));

        const response = await request(app)
            .post('/resgate')
            .send(novoResgate);

        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: `Erro ao realizar o resgate: ${erroEsperado}` });
    });
});
