const planoController = require('../../src/controllers/planoController');
const planoService = require('../../src/services/planoService');

jest.mock('../../src/services/planoService');

describe('Plano Controller', () => {
    test('Deve cadastrar um plano com dados válidos', async () => {
        const req = {
            body: {
                nome: 'Plano de Previdência A',
                susep: '123456',
                expiracaoDeVenda: '2025-12-31T23:59:59Z',
                valorMinimoAporteInicial: 1000.0,
                valorMinimoAporteExtra: 100.0,
                idadeDeEntrada: 18,
                idadeDeSaida: 60,
                carenciaInicialDeResgate: 60,
                carenciaEntreResgates: 30
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const idPlanoMock = 'abc123';

        planoService.cadastrarPlano.mockResolvedValue(idPlanoMock);

        await planoController.cadastrarPlano(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: idPlanoMock });
    });
});
