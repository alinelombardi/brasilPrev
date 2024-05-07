const request = require('supertest');
const app = require('../../src/app');
const produtoService = require('../../src/services/produtoService');

jest.mock('../../src/services/produtoService');

describe('Produto Routes', () => {
    test('Deve cadastrar um produto via rota com dados válidos', async () => {
        const novoProduto = {
            nome: 'Produto de Previdência A',
            susep: '654321',
            expiracaoDeVenda: '2025-12-31T23:59:59Z',
            valorMinimoAporteInicial: 1000.0,
            valorMinimoAporteExtra: 100.0,
            idadeDeEntrada: 18,
            idadeDeSaida: 60,
            carenciaInicialDeResgate: 60,
            carenciaEntreResgates: 30
        };
        const idProdutoMock = 'def456';

        produtoService.cadastrarProduto.mockResolvedValue(idProdutoMock);

        const response = await request(app)
            .post('/produto')
            .send(novoProduto);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ id: idProdutoMock });
    });
});
