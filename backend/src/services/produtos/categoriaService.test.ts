// produtoService.test.ts

import { CategoriaService } from '../../services/produtos/CategoriaService';
import { CategoriaRepository } from '../../repositories/CategoriaRepository';

class Categoria {
    id: number;
    nome: string;
  
    constructor({ id = 0, nome = ''}: { id?: number; nome?: string } = {}) {
      this.id = id;
      this.nome = nome;
    }
  }

// Mock de produtos para o teste
const categoriaMock: Categoria[] = [
  new Categoria({ id: 1, nome: 'Produto A'}),
  new Categoria({ id: 2, nome: 'Produto B'}),
];

jest.mock('../../repositories/CategoriaRepository', () => ({
  CategoriaRepository: jest.fn().mockImplementation(() => ({
    findAll: jest.fn().mockResolvedValue(categoriaMock),
    findOne: jest.fn().mockImplementation(id => Promise.resolve(categoriaMock.find(p => p.id === id))),
    create: jest.fn().mockImplementation((categoriaMock) => Promise.resolve(new Categoria(categoriaMock))),
    save: jest.fn().mockImplementation((categoria) => Promise.resolve(categoria)),
  })),
}));

describe('CategoriaService', () => {
    let categoriaService: CategoriaService;
    let categoriaRepository: CategoriaRepository;
  
    beforeEach(() => {
      // Como ProdutoRepository é uma classe mockada, isso retorna a instância mockada.
      categoriaRepository = new CategoriaRepository();
      categoriaService = new CategoriaService(categoriaRepository);
    });
  
    it('deve encontrar todos os catgorias', async () => {
      const categorias = await categoriaService.findAll();
      expect(categorias).toHaveLength(categoriaMock.length);
      expect(categorias).toEqual(categoriaMock);
      expect(categoriaRepository.findAll).toHaveBeenCalledTimes(1);
    });
  
    it('deve encontrar um produto pelo ID', async () => {
      const categoria = await categoriaService.findOne(1);
      expect(categoria).toEqual(categoriaMock[0]);
      expect(categoriaRepository.findOne).toHaveBeenCalledWith(1);
    });
  
  });
  