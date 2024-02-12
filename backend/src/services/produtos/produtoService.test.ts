// produtoService.test.ts

import { ProdutoService } from '../../services/produtos/ProdutoService';
import { ProdutoRepository } from '../../repositories/ProdutoRepository';

class Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
  
    constructor({ id = 0, nome = '', descricao = '', preco = 0 }: { id?: number; nome?: string; descricao?: string; preco?: number } = {}) {
      this.id = id;
      this.nome = nome;
      this.descricao = descricao;
      this.preco = preco;
    }
  }

// Mock de produtos para o teste
const produtosMock: Produto[] = [
  new Produto({ id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', preco: 10.00 }),
  new Produto({ id: 2, nome: 'Produto B', descricao: 'Descrição do Produto B', preco: 20.00 }),
];

jest.mock('../../repositories/ProdutoRepository', () => ({
  ProdutoRepository: jest.fn().mockImplementation(() => ({
    findAll: jest.fn().mockResolvedValue(produtosMock),
    findOne: jest.fn().mockImplementation(id => Promise.resolve(produtosMock.find(p => p.id === id))),
    create: jest.fn().mockImplementation((produtoData) => Promise.resolve(new Produto(produtoData))),
    save: jest.fn().mockImplementation((produto) => Promise.resolve(produto)),
    // Adicione outros métodos conforme necessário
  })),
}));

describe('ProdutoService', () => {
    let produtoService: ProdutoService;
    let produtoRepository: ProdutoRepository;
  
    beforeEach(() => {
      // Como ProdutoRepository é uma classe mockada, isso retorna a instância mockada.
      produtoRepository = new ProdutoRepository();
      produtoService = new ProdutoService(produtoRepository);
    });
  
    it('deve encontrar todos os produtos', async () => {
      const produtos = await produtoService.findAll();
      expect(produtos).toHaveLength(produtosMock.length);
      expect(produtos).toEqual(produtosMock);
      expect(produtoRepository.findAll).toHaveBeenCalledTimes(1);
    });
  
    it('deve encontrar um produto pelo ID', async () => {
      const produto = await produtoService.findOne(1);
      expect(produto).toEqual(produtosMock[0]);
      expect(produtoRepository.findOne).toHaveBeenCalledWith(1);
    });
  
  });
  