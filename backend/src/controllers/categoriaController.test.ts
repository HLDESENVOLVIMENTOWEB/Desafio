import { CategoriaController } from './CategoriaController';
import { CategoriaService } from '../services/produtos/CategoriaService';
import { Categoria } from '../entities//Categoria';

const categoriasMock = [
  { id: 1, nome: 'Produto A'},
  { id: 1, nome: 'Produto A'}
];

describe('CategoriaController', () => {
  let categoriaController: CategoriaController;
  let mockProdutoService: Partial<CategoriaService>; 

  beforeEach(() => {
    mockProdutoService = {
      findAll: jest.fn().mockResolvedValue(categoriasMock),
    };

    categoriaController = new CategoriaController(mockProdutoService as CategoriaService);
  });

  it('deve retornar uma lista de produtos', async () => {
    const response = await categoriaController.getAll();
    expect(response).toEqual(categoriasMock);
    expect(mockProdutoService.findAll).toHaveBeenCalledTimes(1);
  });
});
