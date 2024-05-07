const resgateController = require('../../src/controllers/resgateController');
const resgateService = require('../../src/services/resgateService');

jest.mock('../../src/services/resgateService');

describe('Resgate Controller', () => {
    test('Deve realizar um resgate com dados válidos', async () => {
        const req = {
            body: {
                idPlano: '123abc',
                valorResgate: 1000.0
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const idResgateMock = 'jkl012';

        resgateService.realizarResgate.mockResolvedValue(idResgateMock);

        await resgateController.realizarResgate(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: idResgateMock });
    });
});
