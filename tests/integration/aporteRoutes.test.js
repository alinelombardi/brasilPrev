const request = require('supertest');
const app = require('../../src/app');
const aporteService = require('../../src/services/aporteService');

jest.mock('../../src/services/aporteService');

describe('Aporte Routes', () => {
    test('Deve realizar um aporte via rota com dados válidos', async () => {
        const novoAporte = {
            idCliente: '123abc',
            idPlano: '456def',
            valorAporte: 500.0
        };
        const idAporteMock = 'f3f4e1ee-e310-41c4-8ba7-23e4e414b396';

        aporteService.realizarAporte.mockResolvedValue(idAporteMock);

        const response = await request(app)
            .post('/aporte')
            .send(novoAporte);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ id: idAporteMock });
    });

    test('Deve retornar erro 500 se o serviço de aporte falhar', async () => {
        const novoAporte = {
            idCliente: '123abc',
            idPlano: '456def',
            valorAporte: 500.0
        };
        const errorMessage = 'Erro interno ao realizar o aporte';

        aporteService.realizarAporte.mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .post('/aporte')
            .send(novoAporte);

        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: `Erro interno ao realizar o aporte: ${errorMessage}` });
    });
});
