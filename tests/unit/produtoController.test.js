const produtoController = require('../../src/controllers/produtoController');
const produtoService = require('../../src/services/produtoService');

jest.mock('../../src/services/produtoService');

describe('Produto Controller', () => {
    test('Deve cadastrar um produto com dados válidos', async () => {
        const req = {
            body: {
                nome: 'Produto de Previdência A',
                susep: '654321',
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
        const idProdutoMock = 'def456';

        produtoService.cadastrarProduto.mockResolvedValue(idProdutoMock);

        await produtoController.cadastrarProduto(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: idProdutoMock });
    });
});
