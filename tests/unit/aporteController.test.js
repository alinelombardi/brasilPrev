const aporteController = require('../../src/controllers/aporteController');
const aporteService = require('../../src/services/aporteService');

jest.mock('../../src/services/aporteService');

describe('Aporte Controller', () => {
    test('Deve realizar um aporte com dados válidos', async () => {
        const req = {
            body: {
                idCliente: '123abc',
                idPlano: '456def',
                valorAporte: 500.0
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const idAporteMock = 'f3f4e1ee-e310-41c4-8ba7-23e4e414b396';

        aporteService.realizarAporte.mockResolvedValue(idAporteMock);

        await aporteController.realizarAporte(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: idAporteMock });
    });

    test('Deve retornar erro 500 se o serviço de aporte falhar', async () => {
        const req = {
            body: {
                idCliente: '123abc',
                idPlano: '456def',
                valorAporte: 500.0
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const errorMessage = 'Erro interno ao realizar o aporte';

        aporteService.realizarAporte.mockRejectedValue(new Error(errorMessage));

        await aporteController.realizarAporte(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: `Erro interno ao realizar o aporte: ${errorMessage}` });
    });
});
