import { ProdutoController } from './ProdutoController';
// Importa o tipo real, mas não o mocka automaticamente
import { ProdutoService } from '../services/produtos/ProdutoService';
import { Produto } from '../entities/Produto';

// Mock de produtos para o teste
const produtosMock = [
  { id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', preco: 10.00 },
  { id: 2, nome: 'Produto B', descricao: 'Descrição do Produto B', preco: 20.00 }
];

describe('ProdutoController', () => {
  let produtoController: ProdutoController;
  let mockProdutoService: Partial<ProdutoService>; // Um subconjunto do ProdutoService com métodos que podem ser mockados

  beforeEach(() => {
    // Cria um mock manual para ProdutoService
    mockProdutoService = {
      findAll: jest.fn().mockResolvedValue(produtosMock),
    };

    // Passa o mock manual para o controlador
    produtoController = new ProdutoController(mockProdutoService as ProdutoService);
  });

  it('deve retornar uma lista de produtos', async () => {
    const response = await produtoController.getAll();
    expect(response).toEqual(produtosMock);
    expect(mockProdutoService.findAll).toHaveBeenCalledTimes(1);
  });
});
