import { Service, Container } from 'typedi';
import { Produto } from '../../entities/Produto';
import { ProdutoRepository } from '../../repositories/ProdutoRepository';

@Service()
export class ProdutoService {
  
    constructor(private produtoRepository = Container.get(ProdutoRepository)) {}

    async create(produtoData: Partial<Produto>): Promise<Produto> {
         const produto = await this.produtoRepository.create(produtoData);
         return produto;
    }

    async findAll(): Promise<Produto[]> {
        return this.produtoRepository.findAll();
    }

    async findOne(id: number): Promise<Produto | undefined> {
       return this.produtoRepository.findOne(id);
    }

    async update(id: number, produtoData: Partial<Produto>): Promise<Produto> {
        let produto = await this.produtoRepository.findOne(id);
        if (!produto) {
            throw new Error('Produto não encontrado');
        }
        return  this.produtoRepository.update(produto);
    }

    async delete(id: number): Promise<void> {
        const produto = await this.produtoRepository.findOne(id);
        if (!produto) {
            throw new Error('Produto não encontrado');
        }
        await this.produtoRepository.delete(id);
    }
}
